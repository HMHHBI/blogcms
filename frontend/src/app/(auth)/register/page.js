"use client";
import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      localStorage.setItem("token", res.data.token);
      document.cookie = `token=${res.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax;`;
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFDFF] px-4">
      <div className="w-full max-w-md p-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
            Create Account
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            Join the next generation of CMS.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 text-black border-none rounded-2xl focus:ring-2 focus:ring-violet-500/20 transition-all outline-none font-medium"
                placeholder="Hassan Bin Imran"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 text-black border-none rounded-2xl focus:ring-2 focus:ring-violet-500/20 transition-all outline-none font-medium"
                placeholder="hassan@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Confirm Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-violet-500 transition-colors" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 text-black border-none rounded-2xl focus:ring-2 focus:ring-violet-500/20 transition-all outline-none font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <Link
          href="/login"
          className="block text-center mt-8 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-violet-600 transition"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
