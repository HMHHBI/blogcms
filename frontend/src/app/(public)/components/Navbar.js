"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
    } catch (e) {
      console.error("Logout error");
    }
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-slate-900"
        >
          HASSAN<span className="text-indigo-600">.</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600"
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition">
            Home
          </Link>
          <Link href="/blogs" className="hover:text-indigo-600 transition">
            Blogs
          </Link>
          <Link href="#about" className="hover:text-indigo-600 transition">
            About
          </Link>
          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-900 font-bold hover:text-indigo-600 transition text-sm px-4"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-6 space-y-4 flex flex-col shadow-xl">
          <Link href="/" className="font-bold text-slate-900">
            Home
          </Link>
          <Link href="/blogs" className="font-bold text-slate-900">
            Blogs
          </Link>
          <Link href="#about" className="font-bold text-slate-900">
            About
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-violet-600 font-bold"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-violet-600 font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-violet-600 font-bold">
                Login
              </Link>
              <Link href="/register" className="text-violet-600 font-bold">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}