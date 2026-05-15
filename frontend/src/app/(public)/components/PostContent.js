"use client";
import { useEffect, useState, useRef } from "react"; // ✅ useRef add kiya
import axios from "@/lib/axios";
import Link from "next/link";
import DOMPurify from "dompurify";
import CommentSection from "./CommentSection";
import {
  Calendar,
  Clock,
  User,
  Share2,
  ChevronLeft,
  LayoutGrid,
  Link2,
  Send,
  MessageCircle,
  MessageSquareText, // ✅ Jump icon
} from "lucide-react";

export default function PostContent({ post }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [showShare, setShowShare] = useState(false);

  // ✅ Comment section ke liye reference banaya
  const commentSectionRef = useRef(null);

  // ✅ Smooth scroll function
  const scrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Fetch Related Posts based on Category
  useEffect(() => {
    if (post.category_id) {
      axios.get(`/posts?category=${post.category_id}&limit=3`).then((res) => {
        const filtered = res.data.data.filter((p) => p.id !== post.id);
        setRelatedPosts(filtered.slice(0, 3));
      });
    }
  }, [post.category_id, post.id]);

  const cleanBody =
    typeof window !== "undefined" ? DOMPurify.sanitize(post.body) : post.body;

  // ✅ Share Logic
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.post_title;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
    setShowShare(false);
  };

  return (
    <main className="bg-[#FDFDFF] min-h-screen">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition font-bold text-sm uppercase tracking-widest"
          >
            <ChevronLeft size={18} /> Back to Feed
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowShare(!showShare)}
              className={`p-2.5 rounded-full transition ${showShare ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-400 hover:text-indigo-600"}`}
            >
              <Share2 size={18} />
            </button>

            {/* Share Dropdown */}
            {showShare && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition text-sm font-bold text-slate-600"
                >
                  <Link2 size={16} /> Copy Link
                </button>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition text-sm font-bold text-slate-600"
                >
                  <Send size={16} /> Facebook
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${shareTitle} ${shareUrl}`}
                  target="_blank"
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition text-sm font-bold text-slate-600"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* --- MAIN ARTICLE (70%) --- */}
        <article className="lg:col-span-8">
          <header className="mb-12">
            <span className="bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full font-black uppercase tracking-[0.2em] text-[10px] mb-8 inline-block">
              {post.category?.title || "Engineering"}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              {post.post_title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 py-8 border-y border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                  H
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Author
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {post.author?.name || "Hassan Bin Imran"}
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-100 hidden md:block"></div>

              {/* ✅ JUMP TO COMMENTS BUTTON */}
              <button
                onClick={scrollToComments}
                className="flex items-center gap-3 group"
              >
                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                  <MessageSquareText size={16} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Join In
                  </p>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    Discussion
                  </p>
                </div>
              </button>

              <div className="h-8 w-px bg-slate-100 hidden md:block"></div>

              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  Published
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <Calendar size={14} className="text-indigo-500" />
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </header>

          {post.image && (
            <div className="mb-16 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={post.image}
                className="w-full h-auto object-cover max-h-150"
                alt={post.post_title}
              />
            </div>
          )}

          <div
            className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-black prose-p:leading-relaxed prose-p:text-slate-600 prose-img:rounded-3xl wrap-break-word"
            dangerouslySetInnerHTML={{ __html: cleanBody }}
          />

          {/* ✅ COMMENT SECTION WITH REF */}
          <div className="mt-16" ref={commentSectionRef}>
            <CommentSection postId={post.id} initialComments={post.comments} />
          </div>
        </article>

        {/* --- SIDEBAR (30%) --- */}
        <aside className="lg:col-span-4 space-y-12">
          <div className="sticky top-32 space-y-12">
            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                  <LayoutGrid size={16} className="text-indigo-600" /> More
                  Stories
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.id}
                      href={`/blogs/${rPost.id}`}
                      className="group block"
                    >
                      <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">
                        {rPost.category?.title}
                      </p>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition line-clamp-2">
                        {rPost.post_title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* About Author Box */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                <User size={16} className="text-indigo-600" /> About Author
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                Hassan is a Software Engineer specializing in full-stack
                architecture and AI-driven systems.
              </p>
              <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:text-slate-900">
                View Profile →
              </button>
            </div>

            {/* Newsletter Mini */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold mb-4 text-xl leading-tight text-white">
                  Never miss a technical update.
                </h4>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3 text-sm mb-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white"
                />
                <button className="w-full py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition shadow-xl">
                  Subscribe
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
