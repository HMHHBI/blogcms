"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

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
    if (!localStorage.getItem("token")) router.push("/login");

    // Categories load karein dropdown ke liye
    axios.get("/categories").then((res) => setCategories(res.data.data));

    // Purana data load karein (Using your new PostResource keys)
    axios.get(`/posts/${id}`).then((res) => {
      const post = res.data.data;
      setTitle(post.post_title); // Matches 'post_title' in Resource
      setContent(post.body); // Matches 'body' in Resource
      setCategoryId(post.category_id); // Matches 'category_id' you just added
      setPreview(post.image); // Matches 'image' in Resource
    });
  }, [id, router]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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
    formData.append("_method", "PUT"); // Laravel Spoofing

    if (image) formData.append("image", image);

    try {
      await axios.post(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
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
            placeholder="Title"
          />

          <select
            className="w-full p-4 bg-slate-50 rounded-xl outline-none"
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

          <textarea
            rows="8"
            className="w-full p-4 bg-slate-50 rounded-xl outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />

          {preview && (
            <img
              src={preview}
              className="h-40 rounded-xl object-cover"
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

          <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition">
            Update Post
          </button>
        </form>
      </div>
    </main>
  );
}
