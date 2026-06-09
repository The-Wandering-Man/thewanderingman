import Link from "next/link";
import Image from "next/image";

const crisisLines = [
  { name: "Lifeline", number: "13 11 14", tel: "131114" },
  { name: "MensLine Australia", number: "1300 789 978", tel: "1300789978" },
  { name: "Beyond Blue", number: "1300 22 46 36", tel: "1300224636" },
  {
    name: "Suicide Call Back Service",
    number: "1300 659 467",
    tel: "1300659467",
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t mt-16"
      style={{ borderColor: "#E2E0DC", backgroundColor: "#F8F7F4" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="The Wandering Man">
              <Image
                src="/TWN-New-BW.png"
                alt="The Wandering Man"
                width={160}
                height={50}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>
              A men's mental health community in Geelong, Victoria. Real
              conversations. Genuine support.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#6B6B6B" }}
            >
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {[
                ["About", "/about"],
                ["Events", "/events"],
                ["Stories", "/blog"],
                ["Resources", "/resources"],
                ["Speaking", "/speaking"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:opacity-70 transition-opacity"
                    style={{ color: "#0D0D0D" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Crisis lines */}
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#6B6B6B" }}
            >
              If you need help now
            </p>
            <ul className="flex flex-col gap-2">
              {crisisLines.map((line) => (
                <li key={line.tel} className="text-sm">
                  <span style={{ color: "#6B6B6B" }}>{line.name} </span>
                  <a
                    href={`tel:${line.tel}`}
                    className="font-bold hover:opacity-70 transition-opacity"
                    style={{ color: "#0D0D0D" }}
                  >
                    {line.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 border-t text-xs flex flex-col sm:flex-row justify-between gap-2"
          style={{ borderColor: "#E2E0DC", color: "#6B6B6B" }}
        >
          <p>
            &copy; {new Date().getFullYear()} The Wandering Man. Geelong,
            Victoria, Australia.
          </p>
          <p>Built with care for the community.</p>
        </div>
      </div>
    </footer>
  );
}
