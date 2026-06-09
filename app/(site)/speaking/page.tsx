import type { Metadata } from "next";
import SpeakingForm from "./SpeakingForm";

export const metadata: Metadata = {
  title: "Workplace Mental Health Talks Geelong | The Wandering Man",
  description:
    "Book The Wandering Man for a workplace mental health talk in Geelong or across Victoria. Practical, evidence-informed, and genuinely impactful.",
  alternates: { canonical: "/speaking" },
};

export default function SpeakingPage() {
  return (
    <>
      <section
        className="px-4 sm:px-6 lg:px-8 py-24"
        style={{ backgroundColor: "#3A6B4A" }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#39E75F" }}
          >
            For organisations
          </p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-6"
            style={{ color: "#F8F7F4" }}
          >
            Bring men's mental health into your workplace
          </h1>
          <p className="text-lg max-w-xl" style={{ color: "#B2DFDB" }}>
            The Wandering Man delivers powerful, practical talks for organisations that are serious
            about the well-being of their people. Grounded in lived experience and evidence-informed
            practice.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0D0D0D" }}>
            Book a Talk
          </h2>
          <p className="text-sm mb-10" style={{ color: "#6B6B6B" }}>
            Fill in the form below and we'll be in touch within two business days.
          </p>
          <SpeakingForm />
        </div>
      </section>
    </>
  );
}
