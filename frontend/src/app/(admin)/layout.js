"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "@/lib/axios";
import AuthGuard from "../components/AuthGuard";
import {
  LayoutDashboard,
  FileText,
  Tags,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Bell,
  User as UserIcon,
  MessageSquare,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    axios
      .get("/user")
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  const menuItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "All Posts", href: "/posts", icon: <FileText size={20} /> },
    { name: "Categories", href: "/categories", icon: <Tags size={20} /> },
    { name: "Comments", href: "/comments", icon: <MessageSquare size={20} /> },
  ];

  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-[#FDFDFF]">
        {/* Mobile Overlay (Only visible on small screens) */}
        <div
          className={`fixed inset-0 bg-slate-900/60 z-40 md:hidden transition-opacity duration-300 ${
            isSidebarOpen
              ? "opacity-100 visible"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* --- SIDEBAR --- */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
            flex flex-col h-full shadow-2xl
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="shrink-0 p-8 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 group font-black text-xl"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                B
              </div>
              <span>
                Blog<span className="text-indigo-400">CMS</span>
              </span>
            </Link>
            <button
              className="md:hidden text-slate-400"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 overflow-y-auto scrollbar-hide space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-xl"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 font-bold text-sm">
                    {item.icon} {item.name}
                  </div>
                  {isActive && (
                    <ChevronRight size={16} className="opacity-50" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="shrink-0 p-6 border-t border-white/5 bg-slate-900">
            <button className="flex items-center gap-3 w-full p-4 rounded-2xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors font-bold text-sm">
              <LogOut size={20} /> Logout
            </button>
          </div>
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        {/* ✅ FIX: Yahan humne width aur margin ko control kiya hai taake white box na aaye */}
        <div
          className={`relative flex-1 flex flex-col min-w-0 h-full overflow-hidden transition-all duration-300 ${isSidebarOpen ? "md:pl-72" : "md:pl-0"}`}
        >
          {/* ✅ GLOBAL HEADER */}
          <header className="shrink-0 h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-10 z-30 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="">
                <p className="text-sm font-black text-slate-900 leading-none capitalize">
                  Welcome, {user?.name || "Hassan"}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  System Administrator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-indigo-600 transition">
                <Bell size={20} />
              </button>

              <div className="h-11 w-11 rounded-full bg-indigo-600 flex items-center justify-center text-white border-2 border-white shadow-md overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="profile" />
                ) : (
                  <UserIcon size={20} />
                )}
              </div>
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-3 bg-slate-50 rounded-2xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm"
              >
                <Menu size={24} />
              </button>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto p-6 md:p-10">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
