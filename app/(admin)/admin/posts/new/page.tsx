import type { Metadata } from "next";

export const metadata: Metadata = { title: "New Post | Admin" };

export default function NewPostPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-4" style={{ color: "#0D0D0D" }}>
        New Post
      </h1>
      <p style={{ color: "#6B6B6B" }}>Post wizard — coming soon.</p>
    </div>
  );
}
