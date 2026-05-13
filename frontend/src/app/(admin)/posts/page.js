// src/app/(admin)/dashboard/page.js mazeed polish
"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data.data));
  }, []);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          System Overview
        </h1>
        <p className="text-slate-500 mt-2">
          Manage your stories and check platform performance.
        </p>
      </header>

      {/* Stats Section... (Jo pehle banaya tha) */}

      <section className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-xl text-slate-800">Recent Stories</h3>
          <Link
            href="/posts/create"
            className="text-sm font-bold text-violet-600 hover:text-violet-800"
          >
            + New Story
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">
                  Title
                </th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">
                  Category
                </th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts.slice(0, 5).map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/30 transition">
                  <td className="p-6 font-bold text-slate-900">
                    {post.post_title}
                  </td>
                  <td className="p-6 text-sm text-slate-500">
                    {post.category?.title || "General"}
                  </td>
                  <td className="p-6 flex gap-4">
                    <Link
                      href={`/posts/edit/${post.id}`}
                      className="text-violet-600 font-bold text-xs uppercase tracking-tighter"
                    >
                      Edit
                    </Link>
                    <button className="text-rose-400 font-bold text-xs uppercase tracking-tighter">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
