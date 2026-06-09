import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import EventForm from "@/components/admin/EventForm";

export const metadata: Metadata = { title: "New Event | TWM Admin" };

export default function NewEventPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}>
      <AdminNav />
      <EventForm />
    </div>
  );
}
