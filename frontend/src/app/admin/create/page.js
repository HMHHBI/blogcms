"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
    axios.get("/categories").then((res) => setCategories(res.data.data));
  }, [router]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !categoryId) {
      alert("Please fill all required fields!");
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
      router.push("/");
    } catch (err) {
      alert(err.response?.data?.message || "Creation failed");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-slate-400 hover:text-indigo-600 mb-8 inline-block"
        >
          ← Cancel
        </Link>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          <h1 className="text-3xl font-black text-slate-900 mb-10">
            Craft a New Story
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              className="w-full text-2xl font-bold border-b-2 outline-none focus:border-indigo-500 pb-4 transition"
              placeholder="Story Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <textarea
              rows="8"
              className="w-full p-6 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed">
              {preview && (
                <img
                  src={preview}
                  className="h-48 w-full object-cover rounded-2xl mb-4"
                  alt="preview"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-indigo-600 transition shadow-xl">
              Publish Story Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
