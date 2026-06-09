# The Wandering Man — Project Brief for Claude Code

## What this is
A website for The Wandering Man (thewanderingman.com.au), a men's mental health community based in Geelong, Victoria, Australia. Built by Alex Fernandez, a member of the group.

## Two audiences, two conversion goals
1. **Men in need / community members** → get them to show up to an event or reach out. The primary CTA is always "Talk to Someone" or "Join Us".
2. **Corporate / speaking enquiries** → organisations that want to book The Wandering Man for workplace mental health talks. CTA is "Book a Talk".

Every page serves one of these two goals. No pages that just exist.

---

## Tech Stack
- **Next.js 15** (App Router, TypeScript)
- **Supabase** (Postgres DB + Auth + Storage)
- **Tailwind CSS**
- **Netlify** (deployment)
- **next/font** for typography (Plus Jakarta Sans)

---

## Brand Tokens (define in tailwind.config.ts and as CSS variables)

```
--color-black:     #0D0D0D   /* near-black, primary background for hero sections */
--color-white:     #F8F7F4   /* warm off-white, primary page background */
--color-green:     #39E75F   /* neon/lime green — THE accent, used sparingly */
--color-green-deep:#3A6B4A   /* forest green — corporate/speaking section */
--color-grey:      #6B6B6B   /* secondary text */
--color-border:    #E2E0DC   /* subtle borders */
```

Typography:
- **Plus Jakarta Sans** — headings (700/800) and body (400/500)
- Scale: use Tailwind defaults, nothing exotic

Design rules:
- Off-white (`--color-white`) is the default page background
- Near-black (`--color-black`) for hero sections and high-impact moments
- Neon green (`--color-green`) is accent ONLY: CTA buttons, hover underlines, category badges, the persistent "Talk to Someone" bar
- Never use neon green as a background for large sections
- Lots of whitespace. Let content breathe.
- Mobile-first throughout

---

## Supabase Schema

Create these tables in `/supabase/migrations/001_initial_schema.sql`:

### `authors`
```sql
id uuid primary key default gen_random_uuid(),
name text not null,
slug text unique not null,
bio text,                          -- journalist-style "why I'm here" 2-3 sentences
title text,                        -- e.g. "Psychologist", "Founder", "Community Member"
credentials text,                  -- e.g. "MAPS, FCCLP"
photo_url text,
role text default 'contributor',   -- 'admin' | 'contributor'
is_active boolean default true,
created_at timestamptz default now()
```

### `posts`
```sql
id uuid primary key default gen_random_uuid(),
title text not null,
slug text unique not null,
excerpt text,
content text,                      -- markdown
featured_image_url text,
author_id uuid references authors(id),
content_type text not null,        -- 'article' | 'interview' | 'talk' | 'update'
category text,                     -- e.g. 'Mental Health', 'Community', 'Expert', 'Resources'
youtube_embed_id text,             -- just the ID, not the full URL
is_featured boolean default false, -- homepage hero
status text default 'draft',       -- 'draft' | 'published'
seo_title text,
seo_description text,
tags text[],
published_at timestamptz,
created_at timestamptz default now(),
updated_at timestamptz default now()
```

### `events`
```sql
id uuid primary key default gen_random_uuid(),
title text not null,
slug text unique not null,
description text,
event_type text,                   -- 'weekly' | 'monthly' | 'special'
location_name text,
location_address text,
starts_at timestamptz not null,
ends_at timestamptz,
is_recurring boolean default false,
recurrence_label text,             -- e.g. "Every Saturday 7am"
featured_image_url text,
rsvp_url text,
is_active boolean default true,
created_at timestamptz default now()
```

### `newsletter_signups`
```sql
id uuid primary key default gen_random_uuid(),
email text unique not null,
first_name text,
created_at timestamptz default now()
```

### `speaking_enquiries`
```sql
id uuid primary key default gen_random_uuid(),
organisation text not null,
contact_name text not null,
contact_email text not null,
contact_phone text,
message text,
status text default 'new',         -- 'new' | 'contacted' | 'booked' | 'closed'
created_at timestamptz default now()
```

---

## Site Structure (App Router)

```
app/
├── layout.tsx                     # Root layout: font, globals, persistent Talk to Someone bar
├── page.tsx                       # Homepage
├── (site)/
│   ├── about/page.tsx             # Mission, team, story
│   ├── events/page.tsx            # Upcoming events list
│   ├── events/[slug]/page.tsx     # Single event
│   ├── blog/page.tsx              # All posts (filterable by content_type)
│   ├── blog/[slug]/page.tsx       # Single post — handles article, interview, talk, update
│   ├── authors/[slug]/page.tsx    # Author profile + their posts
│   ├── resources/page.tsx         # Crisis lines + mental health resources
│   └── speaking/page.tsx          # Corporate/speaking audience page
├── (admin)/
│   ├── admin/page.tsx             # Dashboard (recent posts, drafts, upcoming events)
│   ├── admin/login/page.tsx       # Supabase Auth login
│   ├── admin/posts/new/page.tsx   # Wizard-style post creator
│   ├── admin/posts/[id]/edit/page.tsx
│   ├── admin/events/new/page.tsx  # Event creator
│   └── admin/events/[id]/edit/page.tsx
└── api/
    ├── newsletter/route.ts
    └── speaking-enquiry/route.ts
```

---

## Component Architecture

```
components/
├── ui/
│   ├── Button.tsx                 # variants: primary (green), secondary, ghost
│   ├── Badge.tsx                  # colour-coded category/content-type labels
│   ├── Card.tsx                   # base card with image, badge, title, excerpt, author
│   ├── YoutubeEmbed.tsx           # facade pattern — thumbnail + play button, iframe on click
│   └── RichText.tsx               # renders markdown content
├── site/
│   ├── Header.tsx                 # nav + logo + mobile menu
│   ├── Footer.tsx
│   ├── TalkToSomeoneBanner.tsx    # persistent neon green bar with crisis numbers
│   ├── PostCard.tsx               # article/interview/talk/update card
│   ├── EventCard.tsx
│   ├── AuthorCard.tsx             # compact author byline with photo
│   ├── AuthorProfile.tsx          # full author page header
│   ├── FeaturedPost.tsx           # hero-style featured article (homepage)
│   ├── EventsList.tsx
│   └── NewsletterForm.tsx
└── admin/
    ├── AdminNav.tsx
    ├── PostWizard.tsx             # step-by-step post creator
    ├── EventForm.tsx
    └── ImageUpload.tsx
```

---

## Key UX Requirements

### Persistent "Talk to Someone" bar
- Sits at the very top of every page, above the nav
- Near-black background, neon green text
- Shows: "Need to talk? Call Lifeline 13 11 14" + a small "More resources →" link
- Never dismissed, never hidden on scroll

### YouTube embeds (facade pattern)
- Never render an `<iframe>` on page load
- Show a `<img>` thumbnail (`https://img.youtube.com/vi/{id}/maxresdefault.jpg`) with an absolutely-positioned play button SVG
- On click: swap for the real iframe. This is critical for Core Web Vitals / LCP.

### Admin wizard (non-technical users)
- Step 1: "What are you posting?" — four big visual cards (Article / Video / Event Recap / Community Update)
- Step 2: Title, excerpt, featured image upload
- Step 3: Content (rich text editor — use Tiptap) OR YouTube URL (auto-extract embed ID)
- Step 4: Category, tags, author (select from list)
- Step 5: Preview → Publish or Save Draft
- Autosave to Supabase as draft on every step
- Large touch targets throughout — assume mobile use

### SEO (non-negotiable, bake in from day one)
- `generateMetadata()` on every page with real title + description
- JSON-LD on every page: `Organization` on all, `Event` on event pages, `Article` on post pages, `Person` on author pages
- `app/sitemap.ts` — dynamically generated from Supabase (posts + events)
- `app/robots.ts` — allow all, point to sitemap
- Canonical tags via Next.js metadata `alternates.canonical`
- All images: `next/image` with proper `alt`, `width`, `height`
- Local SEO: every page title includes "Geelong" where natural. Meta descriptions reference Geelong men's mental health.

---

## Environment Variables needed
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://www.thewanderingman.com.au
```

---

## First task for Claude Code

1. Scaffold the Next.js 15 project in the current directory (`npx create-next-app@latest . --typescript --tailwind --app --src-dir=no --import-alias="@/*"`)
2. Install dependencies: `@supabase/supabase-js @supabase/ssr @tiptap/react @tiptap/starter-kit next/font`
3. Set up Tailwind config with brand tokens
4. Create the Supabase migration file (`supabase/migrations/001_initial_schema.sql`) with all tables above
5. Create the folder structure (all dirs, placeholder `page.tsx` files)
6. Build the `TalkToSomeoneBanner` component first — it appears on every page and sets the tone
7. Build `Header` and `Footer`
8. Build the `Homepage` (`app/page.tsx`) with: banner → nav → hero (featured post placeholder) → upcoming events strip → "Join the community" CTA section → footer
9. Wire up Supabase client (`lib/supabase/client.ts` and `lib/supabase/server.ts`)

Do not use placeholder lorem ipsum text. Use real copy from The Wandering Man's mission: "While men's mental health has been hidden from the public eye, it is of paramount importance to the well-being of our community. We're here to change that — one conversation at a time."

Crisis line numbers to use throughout:
- Lifeline: 13 11 14
- MensLine Australia: 1300 789 978
- Beyond Blue: 1300 22 46 36
- Suicide Call Back Service: 1300 659 467
