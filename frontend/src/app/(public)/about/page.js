"use client";
import {
  Bird,
  Code2,
  Cpu,
  Globe,
  Rocket,
  Terminal,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const authors = [
    {
      name: "Hassan Bin Imran",
      role: "Lead Software Engineer",
      bio: "Specializing in Laravel architecture and AI-driven system design. Building the next generation of web experiences.",
      avatar: "H",
      social: { twitter: "#", github: "#", linkedin: "#" },
    },
    {
      name: "Zain Ahmed",
      role: "Senior AI Researcher",
      bio: "Passionate about integrating LLMs and generative AI into scalable enterprise applications.",
      avatar: "Z",
      social: { twitter: "#", github: "#", linkedin: "#" },
    },
    {
      name: "Sarah Khan",
      role: "Full-Stack Developer",
      bio: "Expert in Next.js and React ecosystem. Focused on building high-performance frontend architectures.",
      avatar: "S",
      social: { twitter: "#", github: "#", linkedin: "#" },
    },
  ];

  return (
    <main className="bg-white min-h-screen pb-24">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 border-b border-slate-50">
        <div className="max-w-3xl">
          <span className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full font-black uppercase tracking-[0.2em] text-[10px] mb-8 inline-block">
            The Mission
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-10 tracking-tighter">
            Engineering a more{" "}
            <span className="text-indigo-600">performant</span> web.
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed font-medium">
            Hassan.dev is a technical journal focused on deep engineering
            insights, AI architecture, and the philosophy of clean, scalable
            code.
          </p>
        </div>
      </section>

      {/* 2. THE VISION (GRID) */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-12">
        {[
          {
            icon: <Terminal size={24} />,
            title: "Open Source",
            desc: "Committed to contributing back to the dev community through tools and logic.",
          },
          {
            icon: <Cpu size={24} />,
            title: "AI First",
            desc: "Exploring how LLMs and agentic workflows reshape modern software development.",
          },
          {
            icon: <Globe size={24} />,
            title: "Performance",
            desc: "Optimizing for every millisecond. Because speed is a feature, not an afterthought.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="group p-8 rounded-[2.5rem] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-2xl transition-all duration-500"
          >
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">
              {item.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              {item.desc}
            </p>
          </div>
        ))}
      </section>

      {/* 3. AUTHORS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
            Meet the Authors
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
            The minds behind the technical content
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {authors.map((author, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-[3rem] p-10 hover:shadow-xl transition-all group"
            >
              <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-3xl font-black mb-8 group-hover:rotate-6 transition-transform">
                {author.avatar}
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">
                {author.name}
              </h4>
              <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-6">
                {author.role}
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                {author.bio}
              </p>

              <div className="flex gap-4 border-t border-slate-50 pt-8">
                <a
                  href={author.social.twitter}
                  className="text-slate-300 hover:text-indigo-600 transition"
                >
                  <Bird size={18} />
                </a>
                <a
                  href={author.social.github}
                  className="text-slate-300 hover:text-indigo-600 transition"
                >
                  <Code2 size={18} />
                </a>
                <a
                  href={author.social.linkedin}
                  className="text-slate-300 hover:text-indigo-600 transition"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. THE REVIEW / TESTIMONIAL SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="flex gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-indigo-400 text-2xl">
                  ★
                </span>
              ))}
            </div>
            <h3 className="text-3xl md:text-5xl font-black leading-tight mb-8 tracking-tight">
              "This platform is exactly what the dev community needs. Pure,
              high-level technical depth without the fluff."
            </h3>
            <div className="flex items-center gap-4">
              <div className="h-1 w-12 bg-indigo-500" />
              <div>
                <p className="text-lg font-black tracking-tight">Alex Rivier</p>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
                  CTO @ TechFlow Systems
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        </div>
      </section>
    </main>
  );
}
