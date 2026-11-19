"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Christmas Connections 2026 popup. Shows once per visitor (remembered in
// localStorage) and stops showing after Christmas Day. Delete this component
// and its line in app/(site)/layout.tsx once the event is over.
import { CHRISTMAS_BOOKING_URL } from "@/lib/christmas";
const STORAGE_KEY = "twm-christmas-2026-dismissed";
const LAST_DAY = "2026-12-25"; // Melbourne date

function melbourneToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne" }).format(new Date());
}

export default function ChristmasPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (melbourneToday() > LAST_DAY) return;
    if (pathname?.startsWith("/events")) return; // the events page already features it
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // storage blocked - just show it
    }
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Christmas Connections - free community Christmas lunch"
      onClick={close}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(13,21,18,0.78)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", background: "#FBF8F1", borderRadius: 16, overflow: "hidden", maxWidth: 440, width: "100%", maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 12px 48px rgba(0,0,0,0.4)" }}
      >
        <button
          onClick={close}
          aria-label="Close"
          style={{ position: "absolute", top: 10, right: 10, width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(13,21,18,0.75)", color: "#F4F1EA", fontSize: 22, lineHeight: 1, cursor: "pointer" }}
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/christmas-connections-2026.jpg"
          alt="Christmas Connections: a free, alcohol-free community Christmas lunch. Friday 25 December 2026, 11am to 3pm, Geelong Masonic Centre, 27 Regent Street, Belmont. All members of the community welcome."
          style={{ display: "block", width: "100%", minHeight: 0, flex: "1 1 auto", objectFit: "contain", background: "#123A24" }}
        />
        <div style={{ display: "flex", gap: 10, padding: 14, flexWrap: "wrap" }}>
          <a
            href={CHRISTMAS_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{ flex: "1 1 160px", textAlign: "center", background: "#B3261E", color: "#FFF", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "13px 16px", borderRadius: 10 }}
          >
            Book your seat
          </a>
          <Link
            href="/events#christmas"
            onClick={close}
            style={{ flex: "1 1 120px", textAlign: "center", background: "transparent", color: "#24352B", border: "1.5px solid #24352B", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "12px 16px", borderRadius: 10 }}
          >
            More details
          </Link>
        </div>
      </div>
    </div>
  );
}
