"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Stories", href: "/blog" },
  { label: "Community", href: "/community/jobs" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Resources", href: "/resources" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="w-full border-b"
      style={{
        backgroundColor: "#F8F7F4",
        borderColor: "#E2E0DC",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="The Wandering Man - Home">
          <Image
            src="/TWN-New-BW.png"
            alt="The Wandering Man"
            width={140}
            height={44}
            className="h-10 w-auto object-contain"
            style={{ mixBlendMode: "multiply" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "#0D0D0D" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/speaking"
            className="text-sm font-medium px-4 py-2 rounded-full border transition-colors hover:bg-black hover:text-white"
            style={{ borderColor: "#0D0D0D", color: "#0D0D0D" }}
          >
            Book a Talk
          </Link>
          <Link
            href="/events"
            className="text-sm font-bold px-4 py-2 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
          >
            Join Us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span
            className="block w-5 h-0.5 mb-1 transition-all"
            style={{ backgroundColor: "#0D0D0D" }}
          />
          <span
            className="block w-5 h-0.5 mb-1 transition-all"
            style={{ backgroundColor: "#0D0D0D" }}
          />
          <span
            className="block w-5 h-0.5 transition-all"
            style={{ backgroundColor: "#0D0D0D" }}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div
          className="md:hidden border-t px-4 pb-4"
          style={{ borderColor: "#E2E0DC" }}
        >
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium"
                style={{ color: "#0D0D0D" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3">
              <Link
                href="/speaking"
                className="text-sm font-medium text-center px-4 py-2 rounded-full border"
                style={{ borderColor: "#0D0D0D", color: "#0D0D0D" }}
                onClick={() => setOpen(false)}
              >
                Book a Talk
              </Link>
              <Link
                href="/events"
                className="text-sm font-bold text-center px-4 py-2 rounded-full"
                style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
                onClick={() => setOpen(false)}
              >
                Join Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
