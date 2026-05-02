"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      alert("Error creating post! Check console.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-slate-400 hover:text-indigo-600 mb-8 inline-block font-medium transition"
        >
          ← Cancel and Return
        </Link>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          <h1 className="text-3xl font-black text-slate-900 mb-10">
            Craft a New Story
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <label className="text-xs font-bold uppercase text-slate-400 mb-3 block group-focus-within:text-indigo-600 transition">
                Story Title
              </label>
              <input
                type="text"
                className="w-full text-2xl font-bold border-b-2 border-slate-100 focus:border-indigo-500 outline-none pb-4 transition bg-transparent"
                placeholder="Enter a catchy title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="group">
              <label className="text-xs font-bold uppercase text-slate-400 mb-3 block">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                <option value="1">Technology</option>
                <option value="2">Lifestyle</option>
                <option value="3">AI</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-400 mb-3 block">
                Content
              </label>
              <textarea
                rows="8"
                className="w-full p-6 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500 transition outline-none leading-relaxed text-slate-700"
                placeholder="Write your thoughts here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200">
              <label className="text-xs font-bold uppercase text-slate-400 mb-3 block">
                Featured Image
                {preview && (
                  <div className="mt-4">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                      Image Preview
                    </p>
                    <img
                      src={preview}
                      className="h-48 w-full object-cover rounded-2xl shadow-md"
                    />
                  </div>
                )}
              </label>
              <input
                type="file"
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition cursor-pointer"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  const file = e.target.files[0];
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </div>

            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
              Publish Story Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
