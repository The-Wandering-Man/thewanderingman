"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  table: "member_profiles" | "member_businesses";
  currentState: boolean;
}

export default function ApproveButton({ id, table, currentState }: Props) {
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(currentState);
  const router = useRouter();

  async function toggle() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, table, approve: !approved }),
      });
      if (!res.ok) throw new Error();
      setApproved((a) => !a);
      router.refresh();
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
      style={{
        backgroundColor: approved ? "#6B6B6B" : "#39E75F",
        color: approved ? "#F8F7F4" : "#0D0D0D",
      }}
    >
      {loading ? "Saving..." : approved ? "Unpublish" : "Approve & publish"}
    </button>
  );
}
