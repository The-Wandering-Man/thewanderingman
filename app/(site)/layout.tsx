import TalkToSomeoneBanner from "@/components/site/TalkToSomeoneBanner";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SponsorBanner from "@/components/site/SponsorBanner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TalkToSomeoneBanner />
      <SponsorBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
