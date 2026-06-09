import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import EventForm from "@/components/admin/EventForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit Event | TWM Admin" };

type Props = { params: Promise<{ id: string }> };

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase.from("events").select("*").eq("id", id).single();

  if (!event) notFound();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}>
      <AdminNav />
      <EventForm initial={event} />
    </div>
  );
}
