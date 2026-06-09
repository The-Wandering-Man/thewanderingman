import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story | The Wandering Man",
};

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-extrabold mb-4" style={{ color: "#0D0D0D" }}>
        {params.slug}
      </h1>
      <p style={{ color: "#6B6B6B" }}>Post detail page — coming soon.</p>
    </div>
  );
}
