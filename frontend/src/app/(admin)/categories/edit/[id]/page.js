"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditCategory() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Purana category data load karein
    axios
      .get(`/categories/${id}`)
      .then((res) => {
        const cat = res.data.data;
        setTitle(cat.title);
        setInfo(cat.info);
      })
      .catch(() => alert("Category not found"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Laravel PUT request ke liye hum JSON bhej sakte hain agar image nahi hai
      await axios.put(`/categories/${id}`, { title, info });
      router.push("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFDFF] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12 text-slate-400">
          <Link
            href="/dashboard"
            className="font-bold hover:text-violet-600"
          >
            ← Cancel
          </Link>
          <div className="bg-violet-50 text-violet-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            Editing Category
          </div>
        </div>

        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Update Name
              </label>
              <input
                className="w-full text-4xl font-bold border-none outline-none focus:ring-0 text-slate-900 bg-transparent p-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="h-0.5 w-full bg-slate-50 focus-within:bg-violet-500 transition-all" />
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Update Description
              </label>
              <textarea
                rows="4"
                className="w-full p-6 bg-slate-50 rounded-3xl outline-none focus:ring-2 focus:ring-violet-500/20 border border-slate-100 font-medium text-slate-700"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </div>

            <button className="w-full bg-violet-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-slate-900 transition shadow-2xl">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
