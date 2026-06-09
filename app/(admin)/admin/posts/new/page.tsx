import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import PostWizard from "@/components/admin/PostWizard";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "New Post | TWM Admin" };

export default async function NewPostPage() {
  const supabase = await createClient();
  const { data: authors } = await supabase
    .from("authors")
    .select("id, name")
    .eq("is_active", true)
    .order("name");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}>
      <AdminNav />
      <PostWizard authors={authors ?? []} />
    </div>
  );
}
