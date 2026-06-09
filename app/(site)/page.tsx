import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/site/NewsletterForm";
import { createClient } from "@/lib/supabase/server";
import EventCard, { type Event } from "@/components/site/EventCard";
import PostCard, { type Post } from "@/components/site/PostCard";

export const metadata: Metadata = {
  title: "The Wandering Man | Men's Mental Health Community Geelong",
  description:
    "A men's mental health community in Geelong, Victoria. We show up, we talk, we support each other. Join us.",
  alternates: { canonical: "/" },
};

export const revalidate = 3600;

const staticEvents = [
  {
    title: "Saturday Morning Walk",
    recurrence: "Every Saturday, 7:00am",
    location: "Geelong Waterfront",
    href: "/events",
    type: "weekly",
  },
  {
    title: "Monthly Gathering",
    recurrence: "First Thursday of the month, 7:00pm",
    location: "Geelong CBD",
    href: "/events",
    type: "monthly",
  },
  {
    title: "Men's Mindfulness Session",
    recurrence: "Fortnightly Wednesday, 6:30pm",
    location: "Geelong Community Hub",
    href: "/events",
    type: "special",
  },
];

export default async function HomePage() {
  const supabase = await createClient();

  const [{ data: featuredPost }, { data: liveEvents }, { data: recentPosts }] =
    await Promise.all([
      supabase
        .from("posts")
        .select("id, title, slug, excerpt, featured_image_url, content_type, category, published_at, author:authors(name, slug, photo_url)")
        .eq("status", "published")
        .eq("is_featured", true)
        .single(),
      supabase
        .from("events")
        .select("*")
        .eq("is_active", true)
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true })
        .limit(3),
      supabase
        .from("posts")
        .select("id, title, slug, excerpt, featured_image_url, content_type, category, published_at, author:authors(name, slug, photo_url)")
        .eq("status", "published")
        .eq("is_featured", false)
        .order("published_at", { ascending: false })
        .limit(3),
    ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalisePost = (p: any): Post => ({
    ...p,
    author: Array.isArray(p.author) ? (p.author[0] ?? null) : p.author,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-36 overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="The Wandering Man community in Geelong"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,13,13,0.72)" }} />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#39E75F" }}>
            Geelong, Victoria
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-8" style={{ color: "#F8F7F4" }}>
            While men's mental health has been hidden from the public eye, it is
            of paramount importance to the well-being of our community.
          </h1>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl" style={{ color: "rgba(248,247,244,0.75)" }}>
            We're here to change that - one conversation at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/events"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}>
              Join Us at an Event
            </Link>
            <Link href="/resources"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-medium border transition-colors hover:bg-white hover:text-black"
              style={{ borderColor: "#F8F7F4", color: "#F8F7F4" }}>
              Talk to Someone
            </Link>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { heading: "Show Up", body: "No agenda. No pressure. Just men making the decision to be present with each other. Our events are low-key and welcoming to anyone, wherever you're at." },
              { heading: "Have the Conversation", body: "We believe the most powerful thing a man can do is open up. We create the space for honest, judgment-free conversations about what's really going on." },
              { heading: "Build Community", body: "Isolation is one of the biggest risks to men's mental health. The Wandering Man exists to make sure no one in Geelong has to go through it alone." },
            ].map((item) => (
              <div key={item.heading}>
                <div className="w-8 h-1 mb-6 rounded-full" style={{ backgroundColor: "#39E75F" }} />
                <h2 className="text-xl font-bold mb-3" style={{ color: "#0D0D0D" }}>{item.heading}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featuredPost && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: "#E2E0DC" }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#39E75F" }}>Featured Story</p>
            <Link href={`/blog/${featuredPost.slug}`} className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {featuredPost.featured_image_url && (
                <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <Image src={featuredPost.featured_image_url} alt={featuredPost.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              )}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 group-hover:underline underline-offset-4" style={{ color: "#0D0D0D" }}>
                  {featuredPost.title}
                </h2>
                {featuredPost.excerpt && (
                  <p className="text-base leading-relaxed mb-6" style={{ color: "#6B6B6B" }}>{featuredPost.excerpt}</p>
                )}
                <span className="text-sm font-bold" style={{ color: "#39E75F" }}>Read more &rarr;</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Events strip */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: "#E2E0DC" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#39E75F" }}>What's On</p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#0D0D0D" }}>Upcoming Events in Geelong</h2>
            </div>
            <Link href="/events" className="text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity" style={{ color: "#0D0D0D" }}>
              All events &rarr;
            </Link>
          </div>
          {liveEvents && liveEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveEvents.map((event) => <EventCard key={event.id} event={event as Event} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {staticEvents.map((event) => (
                <Link key={event.title} href={event.href} className="block p-6 rounded-2xl border transition-shadow hover:shadow-md" style={{ borderColor: "#E2E0DC" }}>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide mb-4" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>
                    {event.type}
                  </span>
                  <h3 className="text-base font-bold mb-2" style={{ color: "#0D0D0D" }}>{event.title}</h3>
                  <p className="text-sm mb-1" style={{ color: "#6B6B6B" }}>{event.recurrence}</p>
                  <p className="text-sm" style={{ color: "#6B6B6B" }}>{event.location}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts && recentPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: "#E2E0DC" }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#39E75F" }}>From the Community</p>
                <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#0D0D0D" }}>Recent Stories</h2>
              </div>
              <Link href="/blog" className="text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity" style={{ color: "#0D0D0D" }}>
                All stories &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => <PostCard key={post.id} post={normalisePost(post)} />)}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#39E75F" }}>Stay Connected</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5" style={{ color: "#0D0D0D" }}>Join the community</h2>
          <p className="text-base mb-10 max-w-xl mx-auto" style={{ color: "#6B6B6B" }}>
            Get event reminders, community stories, and resources for men's mental health in Geelong - straight to your inbox. No spam, ever.
          </p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Speaking CTA band */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ backgroundColor: "#3A6B4A" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>For organisations</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#F8F7F4" }}>
              Bring men's mental health into your workplace
            </h2>
            <p className="text-sm max-w-lg" style={{ color: "#B2DFDB" }}>
              The Wandering Man delivers powerful, practical workplace talks for organisations serious about their people's well-being.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/speaking"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#F8F7F4", color: "#0D0D0D" }}>
              Book a Talk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
