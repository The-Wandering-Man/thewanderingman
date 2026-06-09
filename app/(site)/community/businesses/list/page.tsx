import type { Metadata } from "next";
import BusinessListForm from "@/components/site/BusinessListForm";

export const metadata: Metadata = {
  title: "List Your Business | The Wandering Man",
  description:
    "Get your business in front of the Wandering Man community. List for free and support the group.",
};

export default function BusinessListPage() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl mx-auto">
        <a
          href="/community/businesses"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest mb-8 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "#0D0D0D" }}
        >
          &larr; Member businesses
        </a>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#39E75F" }}
        >
          Community directory
        </p>
        <h1 className="text-3xl font-extrabold mb-3" style={{ color: "#0D0D0D" }}>
          List your business
        </h1>
        <p className="text-sm mb-10" style={{ color: "#6B6B6B" }}>
          Free for all Wandering Man members. Your listing goes live once
          we've had a quick look. Usually within 24 hours.
        </p>
        <BusinessListForm />
      </div>
    </section>
  );
}
