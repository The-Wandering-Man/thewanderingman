// One-off import of the legacy WordPress blog posts and event pages into Supabase.
// Usage (from repo root):  node scripts/wp-import/import.mjs
// Reads .env.local for SUPABASE_SERVICE_ROLE_KEY; upserts by slug so it is safe to re-run.
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split(/\r?\n/).filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")]; })
);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const posts = JSON.parse(fs.readFileSync(path.join("scripts", "wp-import", "posts.json"), "utf8"));

// Byline for legacy content. All old posts were published under the site admin / "Blog Writer" accounts.
const { data: author, error: aErr } = await sb
  .from("authors")
  .upsert(
    {
      name: "The Wandering Man",
      slug: "the-wandering-man",
      title: "Committee",
      role: "contributor",
      bio: "Articles and event updates written by The Wandering Man committee and volunteers. Republished from our original website.",
      is_active: true,
    },
    { onConflict: "slug" }
  )
  .select("id")
  .single();
if (aErr) throw aErr;

const rows = posts.map((p) => ({ ...p, author_id: author.id, is_featured: false }));
const { data, error } = await sb.from("posts").upsert(rows, { onConflict: "slug" }).select("slug, published_at");
if (error) throw error;
console.log(`upserted ${data.length} posts`);
for (const r of data.sort((a, b) => a.published_at.localeCompare(b.published_at))) console.log(" ", r.published_at.slice(0, 10), r.slug);
