"use client";
import { useState } from "react";
import axios from "@/lib/axios";
import { Send, MessageSquare } from "lucide-react";
import CommentItem from "./CommentItem";

export default function CommentSection({ postId, initialComments = [] }) {
  const [mainComment, setMainComment] = useState("");

  const handleAction = async (parentId = null, body = "") => {
    const finalBody = parentId ? body : mainComment;
    if (!finalBody.trim()) return;

    try {
      await axios.post(`/posts/${postId}/comments`, {
        comment_body: finalBody,
        parent_id: parentId,
      });
      setMainComment("");
      alert("Success! Your comment is awaiting moderation.");
    } catch (err) {
      alert("Login required to comment.");
    }
  };

  return (
    <section className="mt-20 pt-20 border-t border-slate-100">
      <h3 className="text-3xl font-black text-slate-900 mb-12 tracking-tight flex items-center gap-3">
        <MessageSquare className="text-indigo-600" /> Discussion
      </h3>

      {/* Main Comment Input */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-16">
        <textarea
          className="w-full bg-slate-50 rounded-3xl p-6 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition min-h-30"
          placeholder="Share your technical thoughts..."
          value={mainComment}
          onChange={(e) => setMainComment(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleAction()}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-indigo-600 transition"
          >
            Post Comment <Send size={14} />
          </button>
        </div>
      </div>

      {/* Threaded List */}
      <div className="space-y-4">
        {initialComments.length > 0 ? (
          initialComments.map((c) => (
            <CommentItem key={c.id} comment={c} onReply={handleAction} />
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-4xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
              No discussions yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
