import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import TalkToSomeoneBanner from "@/components/site/TalkToSomeoneBanner";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
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
  alternates: {
    canonical: "/",
  },
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
  description:
    "A men's mental health community based in Geelong, Victoria, Australia.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Geelong",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <TalkToSomeoneBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
