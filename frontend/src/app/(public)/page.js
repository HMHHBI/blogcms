"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => setPosts(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const trendingPost = posts[0];
  const recentPosts = posts.slice(1, 5);

  return (
    <main className="bg-white text-slate-900">
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* ===================================================== */}
        {/* HERO SECTION */}
        {/* ===================================================== */}

        <section className="pb-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold">
              Engineering • AI • Modern Web
            </span>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
              Building modern software experiences for the next generation.
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
              Insights, engineering strategies, Laravel architecture, AI
              integrations, scalable systems, and modern product development.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-slate-900 hover:bg-indigo-600 transition text-white px-7 py-3 rounded-2xl font-medium">
                Explore Articles
              </button>

              <button className="border border-slate-300 hover:bg-slate-100 transition px-7 py-3 rounded-2xl font-medium">
                About Platform
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-100 rounded-4xl overflow-hidden shadow-xl">
              <img
                src={
                  trendingPost?.image ||
                  "https://images.unsplash.com/photo-1518770660439-4636190af475"
                }
                alt=""
                className="w-full h-125 object-cover"
              />
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* FEATURED + RECENT POSTS */}
        {/* ===================================================== */}

        <section className="py-20 border-t border-slate-200">
          <div className="flex items-center justify-between mb-14">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400 font-bold mb-3">
                Latest Insights
              </p>

              <h2 className="text-4xl font-bold tracking-tight">
                Featured Stories & Recent Updates
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-14 items-start">
            {/* TRENDING POST */}

            <div className="lg:col-span-7">
              {trendingPost && (
                <Link href={`/blogs/${trendingPost.id}`}>
                  <article className="group">
                    <div className="overflow-hidden rounded-4xl mb-8">
                      <img
                        src={trendingPost.image}
                        alt=""
                        className="w-full h-105 object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>

                    <span className="text-indigo-600 text-sm font-semibold uppercase tracking-widest">
                      Trending Post
                    </span>

                    <h3 className="text-4xl font-bold leading-tight mt-4 mb-5 group-hover:text-indigo-600 transition">
                      {trendingPost.post_title}
                    </h3>

                    <p className="text-slate-600 text-lg leading-relaxed line-clamp-3">
                      {trendingPost.body}
                    </p>
                  </article>
                </Link>
              )}
            </div>

            {/* RECENT POSTS */}

            <div className="lg:col-span-5">
              <div className="space-y-10">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.id}`}
                    className="group flex gap-5 border-b border-slate-100 pb-8"
                  >
                    <img
                      src={post.image}
                      alt=""
                      className="w-28 h-28 object-cover rounded-2xl shrink-0"
                    />

                    <div>
                      <span className="text-xs uppercase tracking-widest text-indigo-600 font-bold">
                        {post.category?.title || "Technology"}
                      </span>

                      <h4 className="text-xl font-bold leading-snug mt-2 group-hover:text-indigo-600 transition">
                        {post.post_title}
                      </h4>

                      <p className="text-sm text-slate-400 mt-3">5 min read</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* EXPERTISE SECTION */}
        {/* ===================================================== */}

        <section className="py-24">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-slate-400 text-sm font-bold mb-4">
              Expertise
            </p>

            <h2 className="text-4xl font-bold tracking-tight">
              Topics We Explore
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Laravel Architecture",
              "Next.js Engineering",
              "AI Integrations",
              "System Design",
            ].map((item) => (
              <div
                key={item}
                className="border border-slate-200 rounded-4xl p-8 hover:border-indigo-200 hover:shadow-xl transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl font-bold mb-6">
                  {item[0]}
                </div>

                <h3 className="text-xl font-bold mb-3">{item}</h3>

                <p className="text-slate-500 leading-relaxed">
                  Deep technical articles and practical engineering insights.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================== */}
        {/* ABOUT SECTION */}
        {/* ===================================================== */}

        <section className="py-24 border-t border-slate-200">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                alt=""
                className="rounded-4xl w-full h-125 object-cover"
              />
            </div>

            <div>
              <p className="uppercase tracking-[0.3em] text-slate-400 text-sm font-bold mb-5">
                About Platform
              </p>

              <h2 className="text-5xl font-bold tracking-tight leading-tight mb-8">
                Engineering-first content for modern developers.
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We publish practical insights around backend engineering,
                AI-driven applications, scalable systems, modern frontend
                development, and product architecture.
              </p>

              <button className="bg-slate-900 text-white px-7 py-3 rounded-2xl hover:bg-indigo-600 transition">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* STATS SECTION */}
        {/* ===================================================== */}

        <section className="py-24">
          <div className="bg-slate-900 text-white rounded-[3rem] p-12 lg:p-20">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <h3 className="text-5xl font-bold mb-4">50+</h3>

                <p className="text-slate-400">Technical Articles</p>
              </div>

              <div>
                <h3 className="text-5xl font-bold mb-4">10K+</h3>

                <p className="text-slate-400">Monthly Readers</p>
              </div>

              <div>
                <h3 className="text-5xl font-bold mb-4">4+</h3>

                <p className="text-slate-400">Engineering Domains</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== */}
        {/* NEWSLETTER */}
        {/* ===================================================== */}

        <section className="py-24 border-t border-slate-200">
          <div className="max-w-3xl mx-auto text-center">
            <p className="uppercase tracking-[0.3em] text-slate-400 text-sm font-bold mb-4">
              Newsletter
            </p>

            <h2 className="text-5xl font-bold tracking-tight mb-8">
              Join the engineering newsletter.
            </h2>

            <p className="text-lg text-slate-600 mb-10">
              Get modern software engineering insights directly in your inbox.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-slate-300 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-8 py-4 rounded-2xl font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
