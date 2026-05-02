"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // ✅ Image Preview
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");

    // Purana data load karein
    axios.get(`/posts/${id}`).then((res) => {
      setTitle(res.data.data.post_title);
      setContent(res.data.data.body);
      setPreview(`https://blog-cms-api.up.railway.app/storage/${res.data.data.image}`);
    });
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category_id", 1);
    formData.append("_method", "PUT"); // ✅ Laravel Workaround for FormData
    if (image) formData.append("image", image);

    try {
      await axios.post(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/");
    } catch (err) {
      alert("Update failed!");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-8">Edit Story</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-xl space-y-6"
        >
          <input
            className="w-full text-2xl font-bold border-b p-2 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="8"
            className="w-full p-4 bg-slate-50 rounded-xl outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Preview Current/New Image */}
          {preview && (
            <img src={preview} className="h-40 rounded-xl" alt="preview" />
          )}

          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImage(file);
                // Nayi select ki hui image ka preview dikhaein
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold">
            Update Post
          </button>
        </form>
      </div>
    </main>
  );
}
