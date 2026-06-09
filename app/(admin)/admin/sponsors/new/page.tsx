import Link from "next/link";
import SponsorForm from "@/components/admin/SponsorForm";

export default function NewSponsorPage() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#0D0D0D" }}>
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/sponsors"
          className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 mb-6 inline-block"
          style={{ color: "#F8F7F4" }}
        >
          &larr; Sponsors
        </Link>
        <h1 className="text-2xl font-extrabold mb-8" style={{ color: "#F8F7F4" }}>
          Add sponsor
        </h1>
        <SponsorForm />
      </div>
    </div>
  );
}
