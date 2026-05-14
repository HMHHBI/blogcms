"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BookOpen, Layers, Zap, Lightbulb } from "lucide-react";

const data = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 700 },
  { name: "Wed", views: 500 },
  { name: "Thu", views: 1200 },
  { name: "Fri", views: 900 },
  { name: "Sat", views: 1500 },
  { name: "Sun", views: 1800 },
];

export default function DashboardOverview() {
  const [stats, setStats] = useState({ posts: 0, categories: 0 });

  useEffect(() => {
    axios.get("/admin/stats").then((res) => {
      setStats({ posts: res.data.posts, categories: res.data.categories });
    });
  }, []);

  const cards = [
    {
      title: "Total Stories",
      value: stats.posts,
      color: "text-indigo-600",
      icon: <BookOpen />,
      bg: "bg-indigo-50",
    },
    {
      title: "Categories",
      value: stats.categories,
      color: "text-emerald-600",
      icon: <Layers />,
      bg: "bg-emerald-50",
    },
    {
      title: "Performance",
      value: "+24%",
      color: "text-amber-600",
      icon: <Zap />,
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`${card.bg} p-8 rounded-4xl border border-white shadow-sm flex items-center justify-between hover:scale-[1.02] transition-transform`}
          >
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                {card.title}
              </p>
              <p className={`text-4xl font-black ${card.color}`}>
                {card.value}
              </p>
            </div>
            <div className="p-4 bg-white/50 rounded-2xl">{card.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50">
          <h3 className="text-xl font-bold text-slate-800 mb-8">
            Weekly Engagement
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#6366f1"
                  strokeWidth={4}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <Lightbulb className="text-amber-400 mb-6" size={32} />
            <h3 className="text-2xl font-bold mb-4">Insights</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Aapka traffic raat ke waqt zyada hota hai. Scheduled posts use
              karein.
            </p>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
