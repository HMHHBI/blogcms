"use client";
// Saare imports wahi purane
import Link from "next/link";

export default function PostContent({ post }) {
  // Yahan sirf UI dikhani hai, fetch server kar chuka hoga
  const imageBaseUrl = process.env.NEXT_PUBLIC_API_URL.replace("/api", "");
  return (
    <main className="bg-white min-h-screen pb-20">
      <nav className="max-w-4xl mx-auto px-6 py-8">
        <Link
          href="/"
          className="text-slate-400 hover:text-indigo-600 transition font-medium"
        >
          ← Back to Feed
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-6">
        <header className="mb-12">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4 block">
            {post.category?.title || "Story"}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8">
            {post.post_title}
          </h1>
          {/* Author info... */}
        </header>

        {post.image && (
          <div className="mb-12 rounded-4xl overflow-hidden shadow-2xl">
            <img
              src={`${imageBaseUrl}/storage/${post.image}`}
              className="w-full h-auto object-cover max-h-150"
              alt={post.post_title}
            />
          </div>
        )}

        <div className="prose prose-indigo prose-xl max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap font-serif">
          {post.body}
        </div>
      </article>
    </main>
  );
}
