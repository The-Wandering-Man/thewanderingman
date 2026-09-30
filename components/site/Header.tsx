"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Get help", href: "/resources" },
  { label: "For organisations", href: "/speaking" },
  { label: "Sponsors", href: "/sponsors" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#111C16" }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-5" style={{ paddingTop: "18px", paddingBottom: "18px" }}>
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-3" style={{ textDecoration: "none" }} aria-label="The Wandering Man — Home">
          <div className="rounded-full overflow-hidden shrink-0 flex items-center justify-center" style={{ width: 46, height: 46, background: "#192821" }}>
            <Image
              src="/twm-logo-green.png"
              alt="The Wandering Man"
              width={46}
              height={46}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "19px", lineHeight: 1, color: "#F4F1EA", letterSpacing: "0.02em" }}>
              The Wandering Man
            </span>
            <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: "11px", lineHeight: 1, color: "#87988A", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Show Up · Step Up · Stay Connected
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg transition-colors hover:bg-white/5"
              style={{ color: "#CBD5CB", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", padding: "9px 12px" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/events"
            className="rounded-lg ml-2 transition-colors hover:opacity-90"
            style={{ background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: "15px", textDecoration: "none", padding: "11px 18px" }}
          >
            Join an event
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span className="block w-5 h-0.5 mb-1" style={{ backgroundColor: "#CBD5CB" }} />
          <span className="block w-5 h-0.5 mb-1" style={{ backgroundColor: "#CBD5CB" }} />
          <span className="block w-5 h-0.5" style={{ backgroundColor: "#CBD5CB" }} />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="lg:hidden px-5 pb-5 border-t" style={{ borderColor: "rgba(93,138,108,0.2)" }}>
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 px-3 rounded-lg"
                style={{ color: "#CBD5CB", textDecoration: "none", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: "15px" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/events"
              className="mt-3 text-center py-3 px-4 rounded-lg"
              style={{ background: "#5D8A6C", color: "#111C16", textDecoration: "none", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: "15px" }}
              onClick={() => setOpen(false)}
            >
              Join an event
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
