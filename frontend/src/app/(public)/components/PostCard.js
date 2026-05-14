"use client";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "dompurify";

export default function PostCard({ post }) {
  const cleanBody =
    typeof window !== "undefined" ? DOMPurify.sanitize(post.body) : post.body;
  return (
    <article className="group bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      <div className="relative h-64 w-full overflow-hidden bg-gray-200">
        {post.image ? (
          <Image
            src={`${post.image}`}
            alt={post.post_title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={true}
            unoptimized={true}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 font-serif italic text-sm">
            No featured image
          </div>
        )}
      </div>

      <div className="p-6 flex grow flex-col">
        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">
          {post.category?.title || "General"}
        </span>
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition">
          {post.post_title}
        </h2>
        <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
          <span
            className="prose prose-indigo prose-xl max-w-none text-slate-700 leading-relaxed font-serif"
            dangerouslySetInnerHTML={{ __html: cleanBody }}
          />
        </p>

        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <Link
            href={`/blogs/${post.id}`}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
