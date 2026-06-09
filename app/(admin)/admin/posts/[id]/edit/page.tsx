import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import PostWizard from "@/components/admin/PostWizard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit Post | TWM Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: post }, { data: authors }] = await Promise.all([
    supabase.from("posts").select("*").eq("id", id).single(),
    supabase.from("authors").select("id, name").eq("is_active", true).order("name"),
  ]);

  if (!post) notFound();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}>
      <AdminNav />
      <PostWizard authors={authors ?? []} initialPost={post} />
    </div>
  );
}
