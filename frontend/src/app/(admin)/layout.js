"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthGuard from "../components/AuthGuard";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: "📊" },
    { name: "All Posts", href: "/posts", icon: "📝" },
    { name: "Create Post", href: "/posts/create", icon: "✨" },
    { name: "Categories", href: "/categories", icon: "📁" },
  ];

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col
        `}
        >
          <div className="p-8 flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tighter">
              HM<span className="text-violet-400">CMS</span>
            </h2>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              ✕
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-4 rounded-2xl transition font-medium ${
                  pathname === item.href
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{item.icon}</span> {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Admin Mode
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Admin Header (Mobile Only) */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:hidden">
            <button onClick={() => setSidebarOpen(true)} className="text-2xl">
              ☰
            </button>
            <span className="font-black text-slate-900">Dashboard</span>
            <div className="w-8 h-8 rounded-full bg-violet-100" />
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-12">
            <div className="max-w-5xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
