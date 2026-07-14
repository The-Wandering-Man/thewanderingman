import Link from "next/link";
import Image from "next/image";

const crisisLines = [
  { name: "Lifeline", number: "13 11 14", tel: "131114" },
  { name: "MensLine Australia", number: "1300 789 978", tel: "1300789978" },
  { name: "Beyond Blue", number: "1300 22 46 36", tel: "1300224636" },
  { name: "Headspace", number: "1800 650 890", tel: "1800650890" },
  { name: "QLife", number: "1800 184 527", tel: "1800184527" },
  { name: "Suicide Call Back Service", number: "1300 659 467", tel: "1300659467" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100086297627044",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thewanderingmanofficial/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/WanderingManVic",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    comingSoon: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0D1512" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4" aria-label="The Wandering Man">
              <Image
                src="/twm-logo-green.png"
                alt="The Wandering Man"
                width={140}
                height={44}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#5C6B60", fontFamily: "var(--font-body), sans-serif" }}>
              A men's mental health community in Geelong, Victoria.
            </p>
            <p className="text-xs font-semibold italic mb-5" style={{ color: "#87988A", fontFamily: "var(--font-body), sans-serif" }}>
              Show Up. Step Up. Stay Connected.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) =>
                s.comingSoon ? (
                  <span key={s.label} title="LinkedIn coming soon" className="cursor-default" style={{ color: "#3C4A40" }}>
                    {s.icon}
                  </span>
                ) : (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="transition-opacity hover:opacity-60"
                    style={{ color: "#5C6B60" }}
                  >
                    {s.icon}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#3C4A40", fontFamily: "var(--font-body), sans-serif" }}>
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {[
                ["About", "/about"],
                ["Events", "/events"],
                ["Stories", "/blog"],
                ["Speaking", "/speaking"],
                ["Sponsors", "/sponsors"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#87988A", textDecoration: "none", fontFamily: "var(--font-body), sans-serif" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#3C4A40", fontFamily: "var(--font-body), sans-serif" }}>
              Community
            </p>
            <ul className="flex flex-col gap-2">
              {[
                ["Job Board", "/community/jobs"],
                ["Member Businesses", "/community/businesses"],
                ["Resources", "/resources"],
                ["Contact", "mailto:hello@thewanderingman.com.au"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#87988A", textDecoration: "none", fontFamily: "var(--font-body), sans-serif" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Crisis lines */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#3C4A40", fontFamily: "var(--font-body), sans-serif" }}>
              If you need help now
            </p>
            <ul className="flex flex-col gap-2">
              {crisisLines.map((line) => (
                <li key={line.tel} className="text-sm">
                  <span style={{ color: "#5C6B60", fontFamily: "var(--font-body), sans-serif" }}>{line.name} </span>
                  <a href={`tel:${line.tel}`} className="font-bold hover:opacity-70 transition-opacity" style={{ color: "#79A886", textDecoration: "none", fontFamily: "var(--font-body), sans-serif" }}>
                    {line.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-xs flex flex-col sm:flex-row justify-between gap-2" style={{ borderColor: "rgba(93,138,108,0.15)", color: "#3C4A40", fontFamily: "var(--font-body), sans-serif" }}>
          <p>© {new Date().getFullYear()} The Wandering Man Inc. Geelong, Victoria, Australia. ABN 707 257 545 13</p>
          <a href="mailto:hello@thewanderingman.com.au" className="hover:opacity-70 transition-opacity" style={{ color: "#5C6B60", textDecoration: "none" }}>
            hello@thewanderingman.com.au
          </a>
        </div>
      </div>
    </footer>
  );
}
