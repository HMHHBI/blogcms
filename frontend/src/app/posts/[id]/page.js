import PostContent from "./PostContent";

// 1. Data Fetching logic (Wahi purani)
async function getPost(id) {
  try {
    // Try using the actual local URL instead of IP for a second
    const res = await fetch(`https://blog-cms-api.up.railway.app/api/posts/${id}`, {
      cache: "no-store",
    });

    // Agar upar wala fail ho, toh fallback to IP with Port
    if (!res.ok) {
      console.log("Fetching from direct URL failed, trying local IP...");
      const fallback = await fetch(`https://0.0.0.0/api/posts/${id}`, {
        cache: "no-store",
        headers: { Host: "blog-cms-api.up.railway.app" },
      });
      if (!fallback.ok) return null;
      const json = await fallback.json();
      return json.data;
    }

    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Fetch Error in Server Component:", err.message);
    return null;
  }
}

// 2. SEO Metadata (Yahan await params add karein)
export async function generateMetadata({ params }) {
  // ✅ Next.js 15+ ke liye await zaroori hai
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const post = await getPost(id);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.post_title} | Professional Blog`,
    description: post.body.substring(0, 160),
  };
}

// 3. The Main Page (Yahan bhi await params add karein)
export default async function Page({ params }) {
  // ✅ Next.js 15+ ke liye await zaroori hai
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const post = await getPost(id);

  if (!post)
    return <div className="p-20 text-center font-bold">Post not found!</div>;

  return <PostContent post={post} />;
}
