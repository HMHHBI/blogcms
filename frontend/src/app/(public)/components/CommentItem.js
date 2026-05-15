"use client";
import { useState } from "react";
import { MessageSquare, ShieldCheck } from "lucide-react";

export default function CommentItem({ comment, onReply, level = 0 }) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const maxLevel = 3;

  const handleSubmit = () => {
    if (!replyBody.trim()) return;
    onReply(comment.id, replyBody);
    setReplyBody("");
    setIsReplyOpen(false);
  };

  return (
    <div
      className={`mt-8 ${level > 0 ? "ml-6 md:ml-12 border-l-2 border-slate-100 pl-4 md:pl-8" : ""}`}
    >
      <div className="flex gap-4 group">
        <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs shrink-0 border border-indigo-100">
          {comment.user?.name[0]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-black text-slate-900">
                {comment.user?.name}
              </span>
              {comment.user?.is_admin && (
                <ShieldCheck size={14} className="text-indigo-600" />
              )}
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                {comment.created_at}
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {comment.comment_body}
            </p>

            {level < maxLevel && (
              <button
                onClick={() => setIsReplyOpen(!isReplyOpen)}
                className="mt-4 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-slate-900 transition"
              >
                <MessageSquare size={12} /> {isReplyOpen ? "Cancel" : "Reply"}
              </button>
            )}
          </div>

          {isReplyOpen && (
            <div className="mt-4 flex gap-2 animate-in slide-in-from-top-2">
              <input
                className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
                placeholder="Write a reply..."
                value={replyBody}
                onChange={(e) => setReplyBody(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="bg-slate-900 text-white px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition"
              >
                Send
              </button>
            </div>
          )}

          {comment.replies?.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              level={level + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
