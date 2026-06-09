import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Post | Admin" };

export default function EditPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-4" style={{ color: "#0D0D0D" }}>
        Edit Post
      </h1>
      <p style={{ color: "#6B6B6B" }}>Editing post {params.id} — coming soon.</p>
    </div>
  );
}
