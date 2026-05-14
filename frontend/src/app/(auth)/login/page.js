"use client";
import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax;`;
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFDFF] px-4">
      <div className="w-full max-w-md p-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Enter your details to manage your blog.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 text-black border-none rounded-2xl focus:ring-2 focus:ring-violet-500/20 transition-all outline-none font-medium"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-slate-50 text-black border-none rounded-2xl focus:ring-2 focus:ring-violet-500/20 transition-all outline-none font-medium"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-violet-600 transition-all shadow-xl shadow-violet-100 mt-4 flex items-center justify-center gap-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <Link
          href="/"
          className="block text-center mt-10 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-violet-600 transition"
        >
          ← Back to Public Feed
        </Link>
      </div>
    </div>
  );
}
