import type { Metadata } from "next";
import JobProfileForm from "@/components/site/JobProfileForm";

export const metadata: Metadata = {
  title: "Add Your Profile | Member Job Board | The Wandering Man",
  description:
    "Let the Wandering Man community know you're looking for work. Fill in a quick profile and we'll get you in front of local employers.",
};

export default function JobsJoinPage() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl mx-auto">
        <a
          href="/community/jobs"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest mb-8 opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "#0D0D0D" }}
        >
          &larr; Job board
        </a>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#39E75F" }}
        >
          Member profiles
        </p>
        <h1 className="text-3xl font-extrabold mb-3" style={{ color: "#0D0D0D" }}>
          Add your profile
        </h1>
        <p className="text-sm mb-10" style={{ color: "#6B6B6B" }}>
          Takes about 5 minutes. We'll ask you a few questions and put together
          your profile. It'll go live once an admin has approved it.
        </p>
        <JobProfileForm />
      </div>
    </section>
  );
}
