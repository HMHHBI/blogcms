"use client";
import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { email, password });
      const token = res.data.token;

      // 1. LocalStorage for Client-side
      localStorage.setItem("token", token);

      // 2. Cookie for Middleware (Server-side)
      // Hum cookie set kar rahe hain jo 7 din tak valid hogi
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax;`;

      router.push("/admin/create");
    } catch (err) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-500 text-sm">
            Log in to manage your AI-CMS Blog
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase text-slate-400 ml-1 mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-slate-400 ml-1 mb-2 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 transition outline-none"
              required
            />
          </div>
          <button className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mt-4">
            Sign In
          </button>
        </form>
        <Link
          href="/"
          className="block text-center mt-8 text-slate-400 text-sm hover:text-indigo-600 transition"
        >
          ← Back to Public Feed
        </Link>
      </div>
    </div>
  );
}
