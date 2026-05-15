"use client";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";

export default function PostCard({ post }) {
  // Card ke liye hum HTML remove karke sirf plain text dikhayenge (for clean UI)
  const plainText = post.body
    ? post.body.replace(/<[^>]*>?/gm, "").substring(0, 150)
    : "";

  return (
    <article className="group bg-white rounded-[2.5rem] shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.post_title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            unoptimized={true}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-300 font-medium uppercase tracking-widest text-xs">
            No Image Provided
          </div>
        )}
        <div className="absolute top-5 left-5">
          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest shadow-sm">
            {post.category?.title || "General"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex grow flex-col">
        <div className="flex items-center gap-4 mb-4 text-slate-400">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
            <Calendar size={12} className="text-indigo-500" />
            {new Date(post.published_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
            <Clock size={12} className="text-indigo-500" />5 min read
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
          {post.post_title}
        </h2>

        <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
          {plainText}...
        </p>

        {/* Footer Section */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <User size={14} />
            </div>
            <span className="text-xs font-bold text-slate-700">
              {post.author?.name || "Hassan"}
            </span>
          </div>

          <Link
            href={`/blogs/${post.id}`}
            className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest group/link"
          >
            Read More
            <ArrowRight
              size={14}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
