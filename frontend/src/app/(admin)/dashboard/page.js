"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function DashboardOverview() {
  const [stats, setStats] = useState({ posts: 0, categories: 0 });

  useEffect(() => {
    // ✅ Naya Dashboard Stats API call
    axios
      .get("/admin/stats")
      .then((res) => {
        setStats({
          posts: res.data.posts,
          categories: res.data.categories,
        });
      })
      .catch((err) => console.error("Stats fetch failed", err));
  }, []);

  const cards = [
    {
      title: "Total Stories",
      value: stats.posts,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Categories",
      value: stats.categories,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Avg. Read Time",
      value: "4 min",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900">Dashboard</h1>
        <p className="text-slate-500 font-medium">
          Welcome back, Hassan! Here's what's happening.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.bg} p-8 rounded-3xl border border-white shadow-sm`}
          >
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
              {card.title}
            </p>
            <p className={`text-4xl font-black ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder for Chart or Recent Activity */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h3 className="text-xl font-bold mb-6 text-slate-800">Quick Tips</h3>
        <ul className="space-y-4">
          <li className="flex gap-4 items-center text-slate-600">
            <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
            Always add an image for better engagement.
          </li>
          <li className="flex gap-4 items-center text-slate-600">
            <div className="h-2 w-2 bg-indigo-500 rounded-full"></div>
            Check your 'Technology' category for new trends.
          </li>
        </ul>
      </div>
    </div>
  );
}
