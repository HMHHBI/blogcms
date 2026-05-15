"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import {
  CheckCircle,
  Trash2,
  MessageSquare,
  ExternalLink,
  Clock,
} from "lucide-react";

export default function CommentModeration() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Pending Comments
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get("/admin/comments");
      setComments(res.data.data);
    } catch (err) {
      console.error("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve Logic
  const handleApprove = async (id) => {
    try {
      await axios.patch(`/admin/comments/${id}/approve`);
      // Row ko state se nikal dein taake foran update ho
      setComments(comments.filter((comm) => comm.id !== id));
    } catch (err) {
      alert("Approval failed. Try again.");
    }
  };

  // ✅ Delete/Reject Logic
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to reject and delete this comment?")) {
      try {
        await axios.delete(`/admin/comments/${id}`);
        setComments(comments.filter((comm) => comm.id !== id));
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  if (loading)
    return (
      <div className="p-10 text-slate-400 font-bold animate-pulse">
        Loading moderation queue...
      </div>
    );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
          Moderation{" "}
          <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs">
            {comments.length} Pending
          </span>
        </h1>
        <p className="text-slate-500 mt-2">
          Approve or reject community discussions to maintain quality.
        </p>
      </header>

      <section className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  User & Comment
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Target Post
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {comments.length > 0 ? (
                comments.map((comm) => (
                  <tr
                    key={comm.id}
                    className="hover:bg-slate-50/30 transition group"
                  >
                    <td className="p-6 max-w-md">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                          {comm.user.name[0]}
                        </div>
                        <span className="font-bold text-slate-900">
                          {comm.user.name}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold ml-2">
                          <Clock size={10} /> {comm.created_at}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed italic">
                        "{comm.comment_body}"
                      </p>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-tighter">
                        <MessageSquare size={12} />{" "}
                        {comm.post.post_title || comm.post.title}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-end gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleApprove(comm.id)}
                          className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition"
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button
                          onClick={() => handleDelete(comm.id)}
                          className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition"
                        >
                          <Trash2 size={14} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <CheckCircle size={32} />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                        Queue is empty. You're all caught up!
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
