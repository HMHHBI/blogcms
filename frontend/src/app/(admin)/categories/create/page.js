"use client";
import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateCategory() {
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !info.trim()) {
      alert("Please fill all fields!");
      return;
    }

    try {
      // Backend par "/categories" endpoint par POST request
      await axios.post("/categories", { title, info });
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Category creation failed.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFF] py-12 px-4 selection:bg-violet-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-violet-600 transition font-bold flex items-center gap-2"
          >
            <span>←</span> Back to Dashboard
          </Link>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
          <h1 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">
            Add New Category
          </h1>
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Category Name
              </label>
              <input
                className="w-full text-4xl font-bold border-none outline-none focus:ring-0 text-slate-900 bg-transparent p-0"
                placeholder="Technology..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="h-0.5 w-full bg-slate-50 focus-within:bg-violet-500 transition-all" />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Brief Description
              </label>
              <textarea
                rows="4"
                className="w-full p-6 bg-slate-50 rounded-3xl outline-none focus:ring-2 focus:ring-violet-500/20 border border-slate-100 font-medium text-slate-700"
                placeholder="What is this topic about?"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </div>

            <button className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-violet-600 transition-all shadow-2xl shadow-violet-100/50">
              Create Category
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
