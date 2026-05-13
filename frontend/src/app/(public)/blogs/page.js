"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get("/posts").then((res) => setPosts(res.data.data));
  };

  // ✅ Client-side Search Logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.post_title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category?.title === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* 🔍 Search Bar Section */}
      <div className="mb-12 max-w-md mx-auto">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block text-center">
          Search Stories
        </label>
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full p-5 rounded-3xl bg-white border-none shadow-xl shadow-slate-100 focus:ring-2 focus:ring-indigo-500 transition outline-none text-slate-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📚 Categories (Static for now) */}
      <div className="flex gap-4 justify-center mb-12 overflow-x-auto pb-2">
        {["All", "Technology", "Lifestyle", "Programming", "Uncategorized"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ),
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 italic text-slate-400">
          No stories match your search.
        </div>
      )}
    </div>
  );
}
