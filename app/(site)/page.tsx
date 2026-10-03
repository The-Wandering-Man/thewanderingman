import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/site/NewsletterForm";
import { createClient } from "@/lib/supabase/server";
import InlineSponsorAd from "@/components/site/InlineSponsorAd";

export const metadata: Metadata = {
  title: "The Wandering Man - Men's Mental Health Community, Geelong",
  description:
    "A men's peer community in Geelong, Victoria. Real conversations, regular catch-ups, no pressure and no agenda. Show Up. Step Up. Stay Connected.",
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: liveEvents }] = await Promise.all([
    supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .eq("is_recurring", false)
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(3),
  ]);

  return (
    <>
      {/* Hero */}
      <header style={{ position: "relative", overflow: "hidden", background: "#111C16" }}>
        <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "72px 28px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>A men&apos;s peer community · Geelong, Victoria</p>
            <h1 style={{ margin: "0 0 26px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(38px, 6vw, 64px)", lineHeight: 1.08, color: "#F4F1EA", maxWidth: "15ch" }}>Every wandering man is looking for something.</h1>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.55, color: "#CBD5CB", maxWidth: "52ch" }}>Mates. Purpose. Somewhere you&apos;re known and expected. We&apos;re a community of Geelong blokes backing each other - real conversations, regular catch-ups, no pressure and no agenda.</p>
            <p style={{ margin: "0 0 36px", fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.55, color: "#CBD5CB", maxWidth: "52ch" }}>Men&apos;s mental health has been hidden from view for too long. We&apos;re changing that - one conversation at a time.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/events" style={{ background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 19, textDecoration: "none", padding: "18px 28px", borderRadius: 10 }}>Join us at an event</Link>
              <Link href="/resources" style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(203,213,203,0.45)", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 19, textDecoration: "none", padding: "18px 28px", borderRadius: 10 }}>Talk to someone</Link>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
              <Image
                src="/speaker-session.jpg"
                alt="A Wandering Man speaker addressing the group at a session"
                fill
                className="object-cover"
                style={{ objectPosition: "center 30%" }}
                priority
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </div>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1.5, color: "#87988A", textAlign: "center" }}>Some of the regulars. You&apos;d fit right in.</p>
          </div>
        </div>
      </header>

      {/* The Journey */}
      <section style={{ background: "#F4F1EA", padding: "92px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>The journey</p>
          <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.15, color: "#24352B", maxWidth: "20ch" }}>Three steps. One road. Walk it at your own pace.</h2>
          <p style={{ margin: "0 0 56px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "60ch" }}>Whether things feel heavy right now, or life&apos;s just gone a bit quiet - you&apos;re the same bloke at a different point on the same road. You don&apos;t have to work out which. Just start where you are.</p>

          <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "0 26px", maxWidth: 780 }}>
            {/* Step 1 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#5D8A6C", color: "#111C16", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 17, flexShrink: 0 }}>1</div>
              <div style={{ width: 3, flex: 1, background: "linear-gradient(180deg, #5D8A6C, #D8CDB6)", borderRadius: 2, margin: "8px 0" }}></div>
            </div>
            <div style={{ paddingBottom: 44 }}>
              <h3 style={{ margin: "2px 0 10px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.2, color: "#24352B" }}>Show Up</h3>
              <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "58ch" }}>No agenda. No pressure. Just men making the decision to be present with each other. Our events are low-key and welcoming, wherever you&apos;re at.</p>
            </div>
            {/* Step 2 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#41604F", color: "#F4F1EA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 17, flexShrink: 0 }}>2</div>
              <div style={{ width: 3, flex: 1, background: "#D8CDB6", borderRadius: 2, margin: "8px 0" }}></div>
            </div>
            <div style={{ paddingBottom: 44 }}>
              <h3 style={{ margin: "2px 0 10px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.2, color: "#24352B" }}>Step Up</h3>
              <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "58ch" }}>The most powerful thing a man can do is open up. We create the space for honest, judgment-free conversations about what&apos;s really going on - and when you&apos;re ready, you&apos;ll find yourself walking alongside the next bloke through the door.</p>
            </div>
            {/* Step 3 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#24352B", color: "#F4F1EA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 17, flexShrink: 0 }}>3</div>
            </div>
            <div>
              <h3 style={{ margin: "2px 0 10px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.2, color: "#24352B" }}>Stay Connected</h3>
              <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "58ch" }}>Isolation is one of the biggest risks to men&apos;s mental health. The Wandering Man exists to make sure no man in Geelong has to go through it alone. Same time, same place, every week - you&apos;ll be known, and you&apos;ll be expected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "92px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 44 }}>
            <div>
              <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>What&apos;s on</p>
              <h2 style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.15, color: "#24352B", maxWidth: "22ch" }}>Same time. Same place. Every week.</h2>
            </div>
            <Link href="/events" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, color: "#48745A", textDecoration: "none" }}>All events →</Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24, marginBottom: 28 }}>
            {[
              {
                href: "/events#coffee-catchup",
                img: "/Adelines0031506.jpg",
                imgPos: "center",
                alt: "Blokes around the fire pit at a coffee catch-up",
                badge: "Weekly · Coffee’s on us",
                title: "Coffee Catch-Up",
                time: "Every Wednesday, 12:00–1:30pm",
                body: "Orchid & Co, 26 Garden St, East Geelong. No pressure, no agenda - just blokes catching up, making new mates, having a laugh. Hoffy will be there to welcome you.",
              },
              {
                href: "/events#bbqs",
                img: "/11126.jpg",
                imgPos: "center",
                alt: "The Wandering Man community BBQ at Eastern Beach",
                badge: "Monthly · Free feed",
                title: "Monthly BBQ",
                time: "Once a month · dates on our socials & newsletter",
                body: "Snags and burgers on the grill - meat by Grovedale Meats - open conversation, and a good crowd. Often a guest speaker. Bring a mate, or come solo.",
              },
              {
                href: "/events#sunday-stroll",
                img: "/coffee-and-river-walk.jpg",
                imgPos: "center 25%",
                alt: "The crew outside Barwon Edge under The Wandering Man sign after the river walk",
                badge: "Fortnightly · Sunday mornings",
                title: "Sunday River Walk",
                time: "Every other Sunday, 9:00am · Along the Barwon",
                body: "A stroll along the river, then a coffee and a chat at Barwon Edge. Slow it down, check in, no pressure.",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                style={{ textDecoration: "none", background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={card.img} alt={card.alt} style={{ height: 190, width: "100%", objectFit: "cover", objectPosition: card.imgPos, display: "block" }} />
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 14, lineHeight: 1, color: "#48745A", letterSpacing: "0.12em", textTransform: "uppercase" }}>{card.badge}</span>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2, color: "#24352B" }}>{card.title}</h3>
                  <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.4, color: "#41604F" }}>{card.time}</p>
                  <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.5, color: "#5C6B60" }}>{card.body}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* First-time panel */}
          <div style={{ background: "#24352B", borderRadius: 14, padding: "34px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px 40px", alignItems: "start" }}>
            <div>
              <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2, color: "#F4F1EA" }}>First time? Here&apos;s exactly what to expect.</h3>
              <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.55, color: "#CBD5CB" }}>Walking into a room of strangers is the hardest part. So here&apos;s the whole deal, up front.</p>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                ["01", "Turn up. Someone will say g’day within the first minute - that’s their job."],
                ["02", "Stay twenty minutes or two hours. Leave whenever you like."],
                ["03", "Nobody will ask you to share anything. Talking is optional. Listening counts."],
              ].map(([num, text]) => (
                <li key={num} style={{ display: "flex", gap: 12, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.5, color: "#EAEFEA" }}>
                  <span style={{ color: "#79A886", fontWeight: 700, flexShrink: 0 }}>{num}</span>{text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Live events from DB */}
      {liveEvents && liveEvents.length > 0 && (
        <section style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "72px 28px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>Coming up</p>
            <h2 style={{ margin: "0 0 32px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>Special events</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
              {liveEvents.map((event) => (
                <div key={event.id} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, padding: "24px 26px" }}>
                  <p style={{ margin: "0 0 6px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {new Date(event.starts_at).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })}
                  </p>
                  <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.25, color: "#24352B" }}>{event.title}</h3>
                  {event.location && <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.5, color: "#5C6B60" }}>{event.location}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <InlineSponsorAd />

      {/* Story */}
      <section style={{ background: "#192821", padding: "92px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>It gets better</p>
            <blockquote style={{ margin: "0 0 20px", fontFamily: "var(--font-display), sans-serif", fontWeight: 500, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.35, color: "#F4F1EA" }}>
              &ldquo;I turned up to a Wednesday coffee because I couldn&apos;t think of a reason not to. Twelve months on, it&apos;s the anchor of my week - the blokes there know my name, my kids&apos; names, and when I&apos;m having a rough one.&rdquo;
            </blockquote>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 17, lineHeight: 1.4, color: "#87988A" }}>
              A Wednesday regular <span style={{ fontWeight: 400, color: "#5C6B60" }}>· twelve months in</span>
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 260 }}>
              <Image src="/10720.jpg" alt="The regulars at a club day, thumbs up" fill className="object-cover" style={{ objectPosition: "center 30%" }} sizes="(max-width: 768px) 100vw, 500px" />
            </div>
            <div style={{ background: "#24352B", borderRadius: 14, padding: "24px 26px" }}>
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: "#F4F1EA" }}>Worried about someone?</h3>
              <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.5, color: "#CBD5CB" }}>How to start the conversation, what to say - and how to bring him along to a coffee.</p>
              <Link href="/resources#worried" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, color: "#79A886", textDecoration: "none" }}>For partners, mums &amp; mates →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Join / Newsletter */}
      <section id="join" style={{ scrollMarginTop: 70, background: "#E6DECC", padding: "92px 28px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1, color: "#3C6349", letterSpacing: "0.16em", textTransform: "uppercase" }}>Stay connected</p>
          <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.15, color: "#24352B" }}>Not ready to show up in person? Start here.</h2>
          <p style={{ margin: "0 0 32px auto", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "52ch" }}>Get event reminders, community stories and honest resources for men&apos;s mental health in Geelong - straight to your inbox. No spam, ever. Lurk as long as you like.</p>
          <NewsletterForm />
          <p style={{ margin: "24px 0 0", fontFamily: "var(--font-body), sans-serif", fontSize: 16, lineHeight: 1.5, color: "#6E624C" }}>
            Or just follow along:{" "}
            <a href="https://www.facebook.com/profile.php?id=100086297627044" style={{ color: "#3C6349", fontWeight: 700 }}>Facebook</a>{" "}
            ·{" "}
            <a href="https://www.instagram.com/thewanderingmanofficial/" style={{ color: "#3C6349", fontWeight: 700 }}>Instagram</a>
          </p>
        </div>
      </section>

      {/* For organisations */}
      <section style={{ background: "#F4F1EA", padding: "92px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 18, padding: "48px 44px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px 48px", alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>For organisations</p>
            <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.4vw, 38px)", lineHeight: 1.15, color: "#24352B" }}>Bring men&apos;s mental health into your workplace.</h2>
            <p style={{ margin: "0 0 24px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60" }}>Powerful, practical talks for organisations serious about their people - and every booking funds the free community work.</p>
            <Link href="/speaking" style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}>Book a talk</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1, color: "#8A7F68", letterSpacing: "0.12em", textTransform: "uppercase" }}>Past speakers &amp; events</p>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A" }}>Charlie Bezzina · Steve Hall, &ldquo;The Game Changer&rdquo; · Mark Smith · Damian Bourke · Chill Breathe Revive</p>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.6, color: "#5C6B60" }}>50+ men at our November community BBQ - and growing every month.</p>
          </div>
        </div>
      </section>

      <InlineSponsorAd />
    </>
  );
}
