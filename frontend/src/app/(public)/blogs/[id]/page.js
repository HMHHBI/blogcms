import PostContent from "../../components/PostContent";

// 1. Data Fetching logic (Wahi purani)
async function getPost(id) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  try {
    // Try using the actual local URL instead of IP for a second
    const res = await fetch(`${API}/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch post");

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
