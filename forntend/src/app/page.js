"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import PostCard from "./components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get("/posts").then((res) => setPosts(res.data.data));
  };

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
    } catch (e) {}

    localStorage.removeItem("token");
    // Cookie delete karne ke liye uski expiry purani date par set kar dein
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleDelete = async (id) => {
    if (confirm("Uda dein post?")) {
      await axios.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
    }
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
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        {/* 🔍 Search Bar Section */}
        <div className="mb-10 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search stories..."
            className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 📚 Categories (Static for now) */}
        <div className="flex gap-4 justify-center mb-12 overflow-x-auto pb-2">
          {["All", "Technology", "Lifestyle", "Programming", "Uncategorized"].map((cat) => (
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
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isLoggedIn={isLoggedIn}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 italic text-slate-400">
            No stories match your search.
          </div>
        )}
      </div>
    </main>
  );
}
