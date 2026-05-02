"use client";
import Link from "next/link";

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="flex flex-wrap justify-between items-center mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <Link href="/" className="text-3xl font-black text-gray-900 tracking-tight">
        AI-CMS <span className="text-indigo-600">Blog</span>
      </Link>

      <div className="flex items-center gap-3">
        {isLoggedIn ? (
          <>
            <Link href="/admin/create" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
              + New Post
            </Link>
            <button onClick={onLogout} className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-red-50 hover:text-red-600 transition">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}