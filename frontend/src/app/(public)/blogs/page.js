"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import PostCard from "../components/PostCard";
import { Search, Filter, LayoutGrid, Mail } from "lucide-react";

export default function BlogExplorePage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data.data));
  }, []);

  const categories = [
    "All",
    "Technology",
    "Programming",
    "AI",
    "Engineering",
    "Lifestyle",
  ];

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch = post.post_title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category?.title === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.created_at) - new Date(a.created_at);
      if (sortBy === "oldest")
        return new Date(a.created_at) - new Date(b.created_at);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div className="max-w-xl w-full">
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Explore Articles
          </h1>
          <p className="text-slate-500 font-medium mb-8">
            Deep dives into modern engineering and software design.
          </p>

          <div className="relative group">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full pl-14 pr-6 py-5 rounded-4xl bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-slate-700 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Sorting */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm flex gap-1 self-start md:self-auto">
          <button
            onClick={() => setSortBy("newest")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${sortBy === "newest" ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:bg-slate-50"}`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("oldest")}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${sortBy === "oldest" ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:bg-slate-50"}`}
          >
            Oldest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* --- FILTERS (Mobile: Top, Desktop: Sidebar) --- */}
        <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-10 order-1">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Filter size={18} className="text-indigo-600" />
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">
                Categories
              </h3>
            </div>

            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap flex items-center justify-between px-5 py-3 rounded-2xl text-sm font-bold transition-all shrink-0 lg:shrink ${
                    selectedCategory === cat
                      ? "bg-indigo-50 text-indigo-700 lg:translate-x-2"
                      : "bg-white lg:bg-transparent text-slate-400 border border-slate-100 lg:border-none hover:text-slate-600"
                  }`}
                >
                  {cat}
                  <div
                    className={`hidden lg:block w-1.5 h-1.5 rounded-full bg-indigo-600 transition-opacity ${selectedCategory === cat ? "opacity-100" : "opacity-0"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* --- POSTS GRID --- */}
        <div className="lg:col-span-9 order-2">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-50 shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-slate-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No stories found
              </h3>
              <p className="text-slate-400 text-sm">
                Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- 3. NEWSLETTER SECTION (Page Bottom) --- */}
      <section className="mt-20">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl">
          <div className="relative z-10 max-w-xl">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20">
              <Mail size={28} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
              Weekly Engineering Insights
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Join 500+ developers receiving curated articles on Laravel,
              Next.js, and AI Architecture.
            </p>
          </div>

          <div className="w-full md:max-w-md relative z-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@engineering.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder:text-slate-500 transition-all"
              />
              <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition shadow-xl">
                Subscribe
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-4 text-center md:text-left font-bold uppercase tracking-widest opacity-60 italic">
              Zero spam. Only pure engineering content.
            </p>
          </div>

          {/* Background decorations */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px]"></div>
        </div>
      </section>
    </div>
  );
}
