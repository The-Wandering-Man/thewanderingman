import type { Metadata } from "next";
import Link from "next/link";
import BusinessListForm from "@/components/site/BusinessListForm";

export const metadata: Metadata = {
  title: "List Your Business | The Wandering Man",
  description:
    "Get your business in front of the Wandering Man community. List for free and support the group.",
};

export default function BusinessListPage() {
  return (
    <section style={{ background: "#F4F1EA", padding: "64px 28px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Link
          href="/community/businesses"
          style={{ display: "inline-block", marginBottom: 28, color: "#5C6B60", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}
        >
          &larr; Member businesses
        </Link>
        <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Community directory
        </p>
        <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>
          List your business
        </h1>
        <p style={{ margin: "0 0 36px", fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#5C6B60" }}>
          Free for all Wandering Man members. Your listing goes live once we&apos;ve had a quick look - usually within 24 hours.
        </p>
        <BusinessListForm />
      </div>
    </section>
  );
}
