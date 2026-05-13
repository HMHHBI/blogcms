"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-80 bg-slate-50 animate-pulse rounded-2xl" />,
});

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/categories").then((res) => setCategories(res.data.data));
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
      ],
    }),
    [],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId) {
      alert("All fields are required!");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", categoryId);
    if (image) formData.append("image", image);

    try {
      await axios.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/admin/dashboard");
    } catch (err) {
      alert("Post creation failed.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFF] py-12 px-4 selection:bg-violet-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 text-slate-400 hover:text-violet-600 transition-all font-bold"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            Back to Dashboard
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
            New Story Draft
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* --- Title Input --- */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Headline
              </label>
              <input
                className="w-full text-4xl font-bold border-none outline-none focus:ring-0 placeholder:text-slate-200 text-slate-900 bg-transparent p-0"
                placeholder="The story begins here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="h-0.5 w-full bg-slate-50 group-focus-within:bg-violet-500 transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* --- Category Select --- */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-5 bg-slate-50 rounded-3xl outline-none focus:ring-2 focus:ring-violet-500/20 border border-slate-100 font-bold text-slate-600 appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <option value="">Choose a topic</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* --- Image Upload --- */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Cover Image
                </label>
                <div className="relative h-17 group bg-slate-50 rounded-3xl border border-slate-100 hover:border-violet-200 transition-all cursor-pointer flex items-center px-6">
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
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold">
                      +
                    </div>
                    <span className="text-sm font-bold text-slate-500 truncate max-w-45">
                      {image ? image.name : "Upload Image"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Image Preview --- */}
            {preview && (
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src={preview}
                  className="w-full h-80 object-cover"
                  alt="preview"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                  }}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
                >
                  Remove
                </button>
              </div>
            )}

            {/* --- Editor --- */}
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Content
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

            <button className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-violet-600 transition-all duration-300 shadow-2xl shadow-violet-100/50 flex items-center justify-center gap-3 group">
              Publish Story{" "}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}