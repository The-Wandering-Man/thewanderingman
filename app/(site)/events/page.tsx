import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EventCard, { type Event } from "@/components/site/EventCard";
import InlineSponsorAd from "@/components/site/InlineSponsorAd";

export const metadata: Metadata = {
  title: "Events - The Wandering Man, Geelong",
  description:
    "Join us at an upcoming men's mental health event in Geelong. Weekly coffee catch-ups, swims, walks, BBQs and more. Free and open to all men.",
  alternates: { canonical: "/events" },
};

export const revalidate = 3600;

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: oneOffEvents } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .eq("is_recurring", false)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });

  return (
    <>
      {/* Header */}
      <header style={{ background: "#192821", padding: "72px 28px 64px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>What&apos;s on · Geelong</p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.1, color: "#F4F1EA", maxWidth: "18ch" }}>No booking. No cost. No story required.</h1>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.55, color: "#CBD5CB", maxWidth: "58ch" }}>
            There&apos;s a rhythm to the week - coffee on Wednesday, swim and walk on Saturday, river stroll on Sunday. Miss one, come to the next. The whole point is that we&apos;re always there.
          </p>
        </div>
      </header>

      {/* Coffee Catch-Up */}
      <section id="coffee-catchup" style={{ background: "#F4F1EA", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A", letterSpacing: "0.14em", textTransform: "uppercase" }}>Every week · Coffee&apos;s on us · Permanent fixture</p>
            <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>Wednesday Coffee Catch-Up</h2>
            <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.35, color: "#41604F" }}>
              Every Wednesday, 12:00–1:30pm<br />
              <span style={{ fontWeight: 400, fontSize: 19, color: "#5C6B60" }}>Orchid &amp; Co Coffee Shop, 26 Garden St, East Geelong</span>
            </p>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}>Feeling the midweek slump? Take an hour out for yourself. No agendas, no expectations, no pressure - whether you&apos;re having a great week, a tough week, or simply want to get out of the house, you&apos;re always welcome. Sometimes it&apos;s the simple things - a coffee, a laugh, a genuine conversation - that make all the difference.</p>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 17, lineHeight: 1.6, color: "#5C6B60" }}>Coffee&apos;s on us. Hoffy will be there to welcome you - first time, you&apos;ll spot us easily. We&apos;re growing pretty fast.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Adelines0031506.jpg" alt="Members talking around the fire pit over coffee" style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 16, display: "block" }} />
        </div>
      </section>

      {/* Community BBQs */}
      <section id="bbqs" style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/11126.jpg" alt="Community BBQ at Eastern Beach, Geelong" style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 16, display: "block", order: 0 }} />
          <div>
            <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A", letterSpacing: "0.14em", textTransform: "uppercase" }}>Regularly · Free feed · Everyone welcome</p>
            <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>Community BBQs</h2>
            <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.35, color: "#41604F" }}>
              Dates announced on our socials &amp; newsletter<br />
              <span style={{ fontWeight: 400, fontSize: 19, color: "#5C6B60" }}>Recent spots: Barrabool Hills Centre, Highton · Eastern Beach</span>
            </p>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}>
              BBQ supplied - snags and burgers on the grill, with the meat donated by{" "}
              <Link href="/sponsors#grovedale-meats" style={{ color: "#3C6349", fontWeight: 700 }}>Grovedale Meats</Link>.{" "}
              Bring a dessert to share if you&apos;d like (completely optional, always appreciated). Come solo or bring a mate - there&apos;s always a good crowd.
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 17, lineHeight: 1.6, color: "#5C6B60" }}>You&apos;ll also find us running the BBQ at local footy days - like the South Barwon FNC games at McDonald Reserve, Belmont.</p>
          </div>
        </div>
      </section>

      {/* The Wandering Swim */}
      <section id="swim" style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A", letterSpacing: "0.14em", textTransform: "uppercase" }}>Every Saturday · Free · Swimming optional</p>
            <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>The Wandering Swim</h2>
            <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.35, color: "#41604F" }}>
              Every Saturday, 7:00am<br />
              <span style={{ fontWeight: 400, fontSize: 19, color: "#5C6B60" }}>The Tower, Eastern Beach, Geelong Waterfront</span>
            </p>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}>
              Shake off the week. Clear the head. Start the weekend strong. The water&apos;s &ldquo;Geelong warm&rdquo; - big laughs, solid blokes, no egos, just good energy and genuine connection.
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 17, lineHeight: 1.6, color: "#5C6B60" }}>Not keen on a dip? No dramas at all. Come down for a yarn, cheer the boys on, and be part of the crew. Presence matters.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/2809swim.jpg" alt="The swim crew at the Tower, Eastern Beach" style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 16, display: "block" }} />
        </div>
      </section>

      {/* The Man Walk */}
      <section id="man-walk" style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A", letterSpacing: "0.14em", textTransform: "uppercase" }}>Weekly · Run by our mates at The Man Walk</p>
            <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>Walk with us</h2>
            <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.35, color: "#41604F" }}>
              Every Saturday, 8:00am - straight after the swim<br />
              <span style={{ fontWeight: 400, fontSize: 19, color: "#5C6B60" }}>The Man Walk, Geelong · finishes with a well-earned coffee at Orchid &amp; Co</span>
            </p>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}>
              The Man Walk is run by another great organisation, and plenty of our members - and most of our leadership - walk every week. Shoulder-to-shoulder is the easiest way to talk, and a walk is the easiest way to start.
            </p>
            <p style={{ margin: "0 0 24px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 17, lineHeight: 1.6, color: "#5C6B60" }}>Look for the Wandering Man shirts - come say g&apos;day and walk with us. Post-walk coffee comes courtesy of the good folk at Right Mate.</p>
            <a
              href="https://themanwalk.com.au/walks/geelong"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", border: "1.5px solid #24352B", color: "#24352B", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "15px 24px", borderRadius: 10 }}
            >
              Find a walk at themanwalk.com.au →
            </a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/man-walk.png" alt="The Man Walk crew on the Geelong waterfront, coffees in hand" style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 16, display: "block" }} />
        </div>
      </section>

      {/* Sunday Coffee & River Stroll */}
      <section id="sunday-stroll" style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A", letterSpacing: "0.14em", textTransform: "uppercase" }}>Every Sunday · Slow it down</p>
          <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>Sunday Coffee &amp; River Stroll</h2>
          <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.35, color: "#41604F" }}>
            Every Sunday, 9:00am - coffee first<br />
            <span style={{ fontWeight: 400, fontSize: 19, color: "#5C6B60" }}>Barwon Edge Café, on the river</span>
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "62ch" }}>
            This one&apos;s about slowing it down and checking in. Come for the coffee, come for the chat, come because you need it. Good people, good conversations - no pressure, just connection. Everyone&apos;s welcome. Always.
          </p>
        </div>
      </section>

      {/* Bunnings sausage sizzles */}
      <section id="bunnings" style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bunnings-trailer-crew.png" alt="The crew posing in front of the Wandering Man BBQ trailer at Bunnings" style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 16, display: "block", order: 0 }} />
          <div>
            <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A", letterSpacing: "0.14em", textTransform: "uppercase" }}>Fundraiser · Volunteers welcome</p>
            <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>Sausage sizzle fundraisers</h2>
            <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.35, color: "#41604F" }}>
              2026 Bunnings dates<br />
              <span style={{ fontWeight: 400, fontSize: 19, color: "#5C6B60" }}>Fri 14 Aug · Thu 3 Sep · Thu 8 Oct · Fri 6 Nov</span>
            </p>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}>Every snag sold funds the free community work - the coffees, the BBQs, the Christmas lunch. Grab a sausage, say g&apos;day, or jump on the roster and flip a few with us. It&apos;s a surprisingly good day out.</p>
            <a
              href="mailto:hello@thewanderingman.com.au?subject=Sausage sizzle roster"
              style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "15px 24px", borderRadius: 10 }}
            >
              Join the roster
            </a>
          </div>
        </div>
      </section>

      {/* Orphan Christmas */}
      <section id="orphaned-christmas" style={{ background: "#192821", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>Christmas Day · BBQ lunch, 12:00-3:00pm</p>
          <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.15, color: "#F4F1EA", maxWidth: "20ch" }}>Orphan Christmas</h2>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.6, color: "#CBD5CB", maxWidth: "58ch" }}>Christmas can be the loneliest day of the year. If you&apos;ve got no one to spend it with - no family nearby, no plans, nowhere to be - you&apos;ve got us. We all get together, share a proper Christmas feed, and make sure no bloke in Geelong spends the day alone.</p>
          <p style={{ margin: "0 0 28px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 18, lineHeight: 1.6, color: "#87988A" }}>Details announced closer to the day via the newsletter and socials. No invitation needed - if you need somewhere to be, this is it.</p>
          <Link href="/#join" style={{ display: "inline-block", background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}>Get the details when they land</Link>
        </div>
      </section>

      {/* One-off events from DB */}
      {oneOffEvents && oneOffEvents.length > 0 && (
        <section style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "72px 28px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>Coming up</p>
            <h2 style={{ margin: "0 0 32px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>Special events</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
              {oneOffEvents.map((event: Event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* First time panel */}
      <section style={{ background: "#24352B", borderTop: "1px solid #2E4136", padding: "84px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#F4F1EA" }}>First time? Here&apos;s exactly how it goes.</h2>
          <p style={{ margin: "0 0 36px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#CBD5CB", maxWidth: "58ch" }}>The walk from the car park is the hardest bit - every regular remembers it. So here&apos;s the whole thing, no surprises:</p>
          <ol style={{ margin: "0 0 36px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              ["01", "You turn up. Someone will clock you're new and say g'day within the first minute - that's their job, and they like doing it."],
              ["02", "Nobody asks why you came. There's no intake, no form, no circle where you have to share. Talking is optional; listening counts."],
              ["03", "Stay twenty minutes or the whole ninety. Leave whenever you like - and if you come back next week, someone will remember your name."],
            ].map(([num, text]) => (
              <li key={num} style={{ display: "flex", gap: 16, fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.55, color: "#EAEFEA" }}>
                <span style={{ color: "#79A886", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 19, flexShrink: 0 }}>{num}</span>{text}
              </li>
            ))}
          </ol>
          <Link href="/#join" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, color: "#79A886", textDecoration: "none" }}>Not ready in person? Join the newsletter instead →</Link>
        </div>
      </section>

      <InlineSponsorAd />
    </>
  );
}
