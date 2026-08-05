import type { Metadata } from "next";
import Link from "next/link";
import JobProfileForm from "@/components/site/JobProfileForm";

export const metadata: Metadata = {
  title: "Add Your Profile | Member Job Board | The Wandering Man",
  description:
    "Let the Wandering Man community know you're looking for work. Fill in a quick profile and we'll get you in front of local employers.",
};

export default function JobsJoinPage() {
  return (
    <section style={{ background: "#F4F1EA", padding: "64px 28px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Link
          href="/community/jobs"
          style={{ display: "inline-block", marginBottom: 28, color: "#5C6B60", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}
        >
          &larr; Job board
        </Link>
        <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Member profiles
        </p>
        <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>
          Add your profile
        </h1>
        <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#5C6B60" }}>
          Takes about 5 minutes. We&apos;ll ask a few questions and put your card together. It goes live once the committee has approved it.
        </p>
        <p style={{ margin: "0 0 36px", fontFamily: "var(--font-body), sans-serif", fontSize: 16, lineHeight: 1.6, color: "#5C6B60" }}>
          Rather just send a resume? Email it to{" "}
          <a href="mailto:hello@thewanderingman.com.au?subject=Job board - my resume" style={{ color: "#3C6349", fontWeight: 700 }}>
            hello@thewanderingman.com.au
          </a>{" "}
          and we&apos;ll do the rest.
        </p>
        <JobProfileForm />
      </div>
    </section>
  );
}
