// src/app/(admin)/dashboard/page.js mazeed polish
"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/categories").then((res) => setCategories(res.data.data));
  }, []);

  const handleDeleteCategory = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/categories/${id}`);
        setCategories(categories.filter((cat) => cat.id !== id));
      } catch (err) {
        alert("Delete failed. Check if posts are using this category.");
      }
    }
  };

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
            href="/categories/create"
            className="text-sm font-bold text-violet-600 hover:text-violet-800"
          >
            + New Category
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
                  Description
                </th>
                <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {categories.slice(0, 5).map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/30 transition">
                  <td className="p-6 font-bold text-slate-900">{cat.title}</td>
                  <td className="p-6 text-sm text-slate-500">
                    {cat.info || "General"}
                  </td>
                  <td className="p-6 flex gap-4">
                    <Link
                      href={`/categories/edit/${cat.id}`}
                      className="text-violet-600 font-bold text-xs uppercase tracking-tighter"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-rose-400 font-bold text-xs uppercase tracking-tighter"
                    >
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
