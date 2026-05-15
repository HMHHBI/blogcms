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
import {
  BookOpen,
  Layers,
  Zap,
  Lightbulb,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    posts: 0,
    categories: 0,
    pending_comments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/admin/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "Total Stories",
      value: stats.posts,
      color: "text-indigo-600",
      icon: <BookOpen size={20} />,
      bg: "bg-indigo-50",
      link: "/posts",
    },
    {
      title: "Pending Comments",
      value: stats.pending_comments,
      color: "text-rose-600",
      icon: <MessageSquare size={20} />,
      bg: "bg-rose-50",
      link: "/comments",
    },
    {
      title: "System Load",
      value: "Optimal",
      color: "text-emerald-600",
      icon: <Zap size={20} />,
      bg: "bg-emerald-50",
      link: "#",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-4xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <Link
            href={card.link}
            key={i}
            className={`${card.bg} p-8 rounded-[2.5rem] border border-white shadow-sm flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all group`}
          >
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                {card.title}
              </p>
              <p className={`text-4xl font-black ${card.color}`}>
                {card.value}
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:rotate-12 transition-transform">
              {card.icon}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Engagement Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Engagement Flow
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                Weekly activity metrics
              </p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
              Full Report
            </button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { name: "Mon", v: 400 },
                  { name: "Tue", v: 700 },
                  { name: "Wed", v: 500 },
                  { name: "Thu", v: 1200 },
                  { name: "Fri", v: 900 },
                  { name: "Sat", v: 1500 },
                  { name: "Sun", v: 1800 },
                ]}
              >
                <defs>
                  <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f8fafc"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10, fontWeight: "bold" }}
                  dy={10}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "20px",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                    padding: "15px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#6366f1"
                  strokeWidth={4}
                  fill="url(#colorV)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Card */}
        <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
              <Lightbulb className="text-amber-400" size={24} />
            </div>
            <h3 className="text-2xl font-black mb-4 tracking-tight">
              AI Insights
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
              Aapki "AI Engine" wali posts par 40% zyada engagement aa rahi hai.
              Mazeed technical content likhne ka mashwara hai.
            </p>
          </div>
          <button className="relative z-10 w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            Optimize Strategy <ArrowUpRight size={14} />
          </button>

          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
