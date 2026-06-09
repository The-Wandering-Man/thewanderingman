import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Event | Admin" };

export default function EditEventPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-4" style={{ color: "#0D0D0D" }}>
        Edit Event
      </h1>
      <p style={{ color: "#6B6B6B" }}>Editing event {params.id} — coming soon.</p>
    </div>
  );
}
