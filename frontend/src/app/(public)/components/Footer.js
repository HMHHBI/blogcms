"use client";
import Link from "next/link";
import {
  Mail,
  ArrowUpRight,
  Code2,
  Globe,
  Cpu,
  Command,
  Terminal,
  Layers,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 overflow-hidden relative">
      {/* Background Subtle Shapes for Premium Look */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand Column (5 Columns) */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 shadow-xl shadow-slate-200">
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

            <p className="text-slate-500 text-lg leading-relaxed max-w-sm mb-10 font-medium">
              Deep technical insights into high-performance software
              engineering, Laravel architecture, and modern web systems.
            </p>

            {/* Social Icons (Using Stable Lucide Icons) */}
            <div className="flex gap-4">
              {[
                { icon: <Globe size={20} />, label: "Website" },
                { icon: <Command size={20} />, label: "GitHub" },
                { icon: <Cpu size={20} />, label: "LinkedIn" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-sm border border-slate-100"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns (7 Columns) */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {/* Column 1: Navigation */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8 border-l-2 border-indigo-600 pl-3">
                Navigation
              </h4>
              <ul className="space-y-4">
                {["Home", "Blogs", "About", "Projects"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 group"
                    >
                      {item}
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Core Topics */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8 border-l-2 border-slate-200 pl-3">
                Knowledge Base
              </h4>
              <ul className="space-y-4">
                {[
                  { name: "Laravel", icon: <Layers size={12} /> },
                  { name: "Next.js", icon: <Terminal size={12} /> },
                  { name: "System Design", icon: <Cpu size={12} /> },
                  { name: "AI/ML", icon: <Globe size={12} /> },
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      href="#"
                      className="text-sm font-bold text-slate-400 hover:text-slate-900 transition flex items-center gap-2"
                    >
                      <span className="text-slate-200">{item.icon}</span>{" "}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact/Action */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-8 border-l-2 border-slate-200 pl-3">
                Inquiries
              </h4>
              <Link
                href="mailto:hassan@example.com"
                className="inline-flex items-center gap-3 bg-slate-900 text-white px-6 py-4 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 group"
              >
                <Mail size={16} />
                Contact Me
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              © {currentYear} Hassan Bin Imran.
            </p>
            <div className="h-1 w-1 bg-slate-200 rounded-full hidden md:block" />
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
              Built with Next.js 15 & Laravel Sanctum
            </p>
          </div>

          <div className="flex gap-10">
            <Link
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
