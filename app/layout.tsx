import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  axes: ["opsz"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "The Wandering Man | Men's Mental Health Community Geelong",
    template: "%s | The Wandering Man",
  },
  description:
    "A men's mental health community in Geelong, Victoria. Real conversations, genuine support, and a space to show up exactly as you are.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thewanderingman.com.au"
  ),
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "The Wandering Man",
    locale: "en_AU",
    type: "website",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Wandering Man",
  url: "https://www.thewanderingman.com.au",
  description: "A men's mental health community based in Geelong, Victoria, Australia.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Geelong",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${sourceSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
