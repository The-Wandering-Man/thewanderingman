import Link from "next/link";

export default function TalkToSomeoneBanner() {
  return (
    <div
      className="w-full py-2.5 px-5"
      style={{ backgroundColor: "#0D1512", borderBottom: "1px solid rgba(93,138,108,0.4)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap text-sm">
        <span style={{ color: "#CBD5CB", fontFamily: "var(--font-body), sans-serif", fontWeight: 600 }}>
          Need to talk right now?
        </span>
        <a
          href="tel:131114"
          style={{ color: "#79A886", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, textDecoration: "none" }}
        >
          Call Lifeline — 13 11 14
        </a>
        <Link
          href="/resources"
          style={{ color: "#CBD5CB", fontFamily: "var(--font-body), sans-serif", textDecoration: "underline", textUnderlineOffset: "3px" }}
        >
          More ways to get help →
        </Link>
      </div>
    </div>
  );
}
