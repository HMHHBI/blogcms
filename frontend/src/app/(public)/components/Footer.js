"use client";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Hassan's Blog</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8">
          Sharing insights about software engineering, Laravel, and AI.
        </p>
        <div className="flex justify-center gap-6 text-slate-400 mb-8">
          <a href="#" className="hover:text-indigo-600 transition">
            Twitter
          </a>
          <a href="#" className="hover:text-indigo-600 transition">
            GitHub
          </a>
          <a href="#" className="hover:text-indigo-600 transition">
            LinkedIn
          </a>
        </div>
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Hassan Bin Imran. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
