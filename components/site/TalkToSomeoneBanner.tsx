import Link from "next/link";

export default function TalkToSomeoneBanner() {
  return (
    <div
      className="w-full py-2 px-4"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-sm flex-wrap">
        <p style={{ color: "#F8F7F4" }}>
          Need to talk?{" "}
          <a
            href="tel:131114"
            className="font-700"
            style={{ color: "#39E75F" }}
          >
            Call Lifeline 13 11 14
          </a>
        </p>
        <Link
          href="/resources"
          className="text-xs underline underline-offset-2 whitespace-nowrap"
          style={{ color: "#39E75F" }}
        >
          More resources &rarr;
        </Link>
      </div>
    </div>
  );
}
