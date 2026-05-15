"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // ✅ usePathname add kiya
import axios from "@/lib/axios";
import { Menu, X, LayoutDashboard, LogOut, Code2 } from "lucide-react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // ✅ Current path check karne ke liye

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      localStorage.removeItem("token");
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      setIsLoggedIn(false);
      setIsOpen(false); // Mobile menu band karne ke liye
      router.push("/");
    } catch (e) {
      console.error("Logout error");
    }
  };

  // ✅ Navigation Items with Logic
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 shadow-lg shadow-slate-200">
            <span className="text-3xl font-black tracking-tighter leading-none text-white">
              B
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-wide text-slate-900 leading-none">
              Blog<span className="text-indigo-600">CMS</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">
              Engineering
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-xs font-black uppercase tracking-widest transition-colors pb-1 ${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item.name}
                  {/* ✅ Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="h-6 w-px bg-slate-100" />

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-100 transition shadow-sm border border-indigo-100"
                >
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-indigo-600 px-4"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600 bg-slate-50 rounded-lg active:scale-95 transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`text-sm font-black uppercase tracking-widest ${
                pathname === item.href ? "text-indigo-600" : "text-slate-900"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <hr className="border-slate-50" />
          {isLoggedIn ? (
            <div className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              {/* ✅ Mobile Logout Button FIXED */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-2xl font-black uppercase tracking-widest text-sm"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm font-black uppercase tracking-widest text-slate-900 py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="bg-slate-900 text-white text-center py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
