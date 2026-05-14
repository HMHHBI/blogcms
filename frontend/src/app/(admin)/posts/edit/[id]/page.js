"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-80 bg-slate-50 animate-pulse rounded-2xl" />,
});

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/categories").then((res) => setCategories(res.data.data));
    axios.get(`/posts/${id}`).then((res) => {
      const post = res.data.data;
      setTitle(post.post_title);
      setContent(post.body);
      setCategoryId(post.category_id);
      setPreview(post.image);
    });
  }, [id]);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
      ],
    }),
    [],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", categoryId);
    formData.append("_method", "PUT");
    if (image) formData.append("image", image);

    try {
      await axios.post(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFF] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-violet-600 transition font-bold flex items-center gap-2"
          >
            <span>←</span> Cancel Editing
          </Link>
          <div className="bg-violet-50 text-violet-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            Editing Mode
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* --- Title --- */}
            <div className="space-y-4 group">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Update Headline
              </label>
              <input
                className="w-full text-4xl font-bold border-none outline-none focus:ring-0 text-slate-900 bg-transparent p-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="h-0.5 w-full bg-slate-50 group-focus-within:bg-violet-500 transition-all" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* --- Category --- */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Change Topic
                </label>
                <select
                  className="w-full p-5 bg-slate-50 rounded-3xl outline-none focus:ring-2 focus:ring-violet-500/20 border border-slate-100 font-bold text-slate-600 cursor-pointer"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* --- Image --- */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Replace Cover
                </label>
                <div className="relative h-17 bg-slate-50 rounded-3xl border border-slate-100 flex items-center px-6">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <span className="text-sm font-bold text-slate-500 truncate">
                    {image ? image.name : "Change Photo"}
                  </span>
                </div>
              </div>
            </div>

            {preview && (
              <div className="rounded-[2.5rem] overflow-hidden shadow-xl">
                <img
                  src={preview}
                  className="h-64 w-full object-cover"
                  alt="preview"
                />
              </div>
            )}

            {/* --- Editor --- */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Edit Content
              </label>
              <div className="editor-container bg-slate-50 rounded-4xl border border-slate-100 overflow-hidden focus-within:ring-2 focus-within:ring-violet-500/10 transition-all min-h-100 w-full text-4xl focus:ring-0 text-slate-900 p-0">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  className="h-80.7 font-sans"
                />
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-violet-600 transition-all shadow-2xl shadow-violet-100/50">
              Save & Update Story
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
