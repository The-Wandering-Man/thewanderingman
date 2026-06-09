"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import RichEditor from "./RichEditor";

type ContentType = "article" | "interview" | "talk" | "update";

interface Author { id: string; name: string; }

interface InitialPost {
  id: string;
  title: string;
  excerpt: string | null;
  featured_image_url: string | null;
  content: string | null;
  content_type: string;
  youtube_embed_id: string | null;
  category: string | null;
  tags: string[] | null;
  author_id: string | null;
}

interface WizardState {
  content_type: ContentType | null;
  title: string;
  excerpt: string;
  featured_image_url: string;
  content: string;
  youtube_url: string;
  youtube_embed_id: string;
  category: string;
  tags: string;
  author_id: string;
  is_featured: boolean;
  spotlight_order: string;
}

const CONTENT_TYPES: { value: ContentType; label: string; desc: string; emoji: string }[] = [
  { value: "article", label: "Article", desc: "Written piece — opinion, story, advice", emoji: "✍️" },
  { value: "interview", label: "Interview", desc: "Conversation with a member or expert", emoji: "🎙️" },
  { value: "talk", label: "Talk / Video", desc: "Video or event recap with YouTube embed", emoji: "🎬" },
  { value: "update", label: "Community Update", desc: "News, announcements, event wrap-ups", emoji: "📣" },
];

const CATEGORIES = ["Mental Health", "Community", "Expert", "Resources", "Events", "Stories"];

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractYoutubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? "";
}

export default function PostWizard({ authors, initialPost }: { authors: Author[]; initialPost?: InitialPost }) {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(initialPost ? 2 : 1);
  const [draftId, setDraftId] = useState<string | null>(initialPost?.id ?? null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const [state, setState] = useState<WizardState>({
    content_type: (initialPost?.content_type as ContentType) ?? null,
    title: initialPost?.title ?? "",
    excerpt: initialPost?.excerpt ?? "",
    featured_image_url: initialPost?.featured_image_url ?? "",
    content: initialPost?.content ?? "",
    youtube_url: "",
    youtube_embed_id: initialPost?.youtube_embed_id ?? "",
    category: initialPost?.category ?? "",
    tags: initialPost?.tags?.join(", ") ?? "",
    author_id: initialPost?.author_id ?? authors[0]?.id ?? "",
    is_featured: (initialPost as any)?.is_featured ?? false,
    spotlight_order: (initialPost as any)?.spotlight_order?.toString() ?? "",
  });

  function update(field: keyof WizardState, value: string) {
    setState((prev) => ({ ...prev, [field]: value }));
  }

  // Autosave draft whenever state changes (debounced)
  const saveDraft = useCallback(
    async (data: WizardState, id: string | null) => {
      if (!data.title && !data.content_type) return;
      setSaving(true);

      const payload = {
        title: data.title || "Untitled draft",
        slug: slugify(data.title || `draft-${Date.now()}`),
        excerpt: data.excerpt || null,
        content: data.content || null,
        featured_image_url: data.featured_image_url || null,
        content_type: data.content_type ?? "article",
        category: data.category || null,
        youtube_embed_id: data.youtube_embed_id || null,
        author_id: data.author_id || null,
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        is_featured: data.is_featured === true || data.is_featured === ("true" as unknown),
        spotlight_order: data.spotlight_order ? parseInt(data.spotlight_order as string) : null,
        status: "draft",
      };

      if (id) {
        await supabase.from("posts").update(payload).eq("id", id);
      } else {
        const { data: created } = await supabase
          .from("posts")
          .insert(payload)
          .select("id")
          .single();
        if (created) setDraftId(created.id);
      }
      setSaving(false);
    },
    [supabase]
  );

  useEffect(() => {
    const timer = setTimeout(() => saveDraft(state, draftId), 1500);
    return () => clearTimeout(timer);
  }, [state, draftId, saveDraft]);

  async function publish() {
    setPublishing(true);
    const payload = {
      title: state.title,
      slug: slugify(state.title),
      excerpt: state.excerpt || null,
      content: state.content || null,
      featured_image_url: state.featured_image_url || null,
      content_type: state.content_type ?? "article",
      category: state.category || null,
      youtube_embed_id: state.youtube_embed_id || null,
      author_id: state.author_id || null,
      tags: state.tags ? state.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      is_featured: state.is_featured === true || (state.is_featured as unknown) === "true",
      spotlight_order: state.spotlight_order ? parseInt(state.spotlight_order) : null,
      status: "published",
      published_at: new Date().toISOString(),
    };

    if (draftId) {
      await supabase.from("posts").update(payload).eq("id", draftId);
      router.push(`/blog/${payload.slug}`);
    } else {
      const { data } = await supabase.from("posts").insert(payload).select("slug").single();
      if (data) router.push(`/blog/${data.slug}`);
    }
  }

  const canAdvance = () => {
    if (step === 1) return !!state.content_type;
    if (step === 2) return !!state.title;
    if (step === 3) return !!(state.content || state.youtube_embed_id);
    return true;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={
                s === step
                  ? { backgroundColor: "#39E75F", color: "#0D0D0D" }
                  : s < step
                  ? { backgroundColor: "#0D0D0D", color: "#F8F7F4" }
                  : { backgroundColor: "#E2E0DC", color: "#6B6B6B" }
              }
            >
              {s < step ? "✓" : s}
            </div>
            {s < 5 && (
              <div
                className="w-8 h-0.5"
                style={{ backgroundColor: s < step ? "#0D0D0D" : "#E2E0DC" }}
              />
            )}
          </div>
        ))}
        <span className="ml-3 text-xs" style={{ color: "#6B6B6B" }}>
          {saving ? "Saving draft..." : draftId ? "Draft saved" : ""}
        </span>
      </div>

      {/* Step 1: Content type */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-extrabold mb-2" style={{ color: "#0D0D0D" }}>
            What are you posting?
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B6B6B" }}>Choose the type that best fits.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTENT_TYPES.map((ct) => (
              <button
                key={ct.value}
                onClick={() => update("content_type", ct.value)}
                className="text-left p-5 rounded-2xl border-2 transition-all"
                style={{
                  borderColor: state.content_type === ct.value ? "#39E75F" : "#E2E0DC",
                  backgroundColor: state.content_type === ct.value ? "#F0FDF4" : "#fff",
                }}
              >
                <span className="text-2xl mb-3 block">{ct.emoji}</span>
                <p className="font-bold text-sm mb-1" style={{ color: "#0D0D0D" }}>{ct.label}</p>
                <p className="text-xs" style={{ color: "#6B6B6B" }}>{ct.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Title + excerpt + image */}
      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-2xl font-extrabold mb-6" style={{ color: "#0D0D0D" }}>
              Give it a title
            </h2>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
              Title *
            </label>
            <input
              type="text"
              value={state.title}
              onChange={(e) => update("title", e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none"
              style={{ borderColor: "#E2E0DC" }}
              placeholder="What's this post about?"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
              Excerpt
            </label>
            <textarea
              rows={3}
              value={state.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none resize-none"
              style={{ borderColor: "#E2E0DC" }}
              placeholder="One or two sentences that appear in post cards and search results."
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
              Featured Image URL
            </label>
            <input
              type="url"
              value={state.featured_image_url}
              onChange={(e) => update("featured_image_url", e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none"
              style={{ borderColor: "#E2E0DC" }}
              placeholder="https://..."
            />
            <p className="text-xs mt-1" style={{ color: "#6B6B6B" }}>
              Upload to Supabase Storage and paste the public URL here.
            </p>
          </div>
        </div>
      )}

      {/* Step 3: Content or YouTube */}
      {step === 3 && (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold" style={{ color: "#0D0D0D" }}>
            {state.content_type === "talk" ? "Add your video" : "Write your content"}
          </h2>

          {state.content_type === "talk" ? (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
                YouTube URL
              </label>
              <input
                type="url"
                value={state.youtube_url}
                onChange={(e) => {
                  const url = e.target.value;
                  update("youtube_url", url);
                  update("youtube_embed_id", extractYoutubeId(url));
                }}
                className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none"
                style={{ borderColor: "#E2E0DC" }}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              {state.youtube_embed_id && (
                <p className="text-xs mt-2" style={{ color: "#39E75F" }}>
                  ✓ Video ID detected: {state.youtube_embed_id}
                </p>
              )}
              <div className="mt-6">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
                  Description (optional)
                </label>
                <RichEditor value={state.content} onChange={(v) => update("content", v)} />
              </div>
            </div>
          ) : (
            <RichEditor value={state.content} onChange={(v) => update("content", v)} />
          )}
        </div>
      )}

      {/* Step 4: Category, tags, author */}
      {step === 4 && (
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-extrabold" style={{ color: "#0D0D0D" }}>
            Organise it
          </h2>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
              Category
            </label>
            <select
              value={state.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none"
              style={{ borderColor: "#E2E0DC" }}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
              Tags
            </label>
            <input
              type="text"
              value={state.tags}
              onChange={(e) => update("tags", e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none"
              style={{ borderColor: "#E2E0DC" }}
              placeholder="anxiety, community, geelong (comma separated)"
            />
          </div>
          {authors.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
                Author
              </label>
              <select
                value={state.author_id}
                onChange={(e) => update("author_id", e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none"
                style={{ borderColor: "#E2E0DC" }}
              >
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Homepage placement */}
          <div
            className="p-4 rounded-xl border"
            style={{ borderColor: "#E2E0DC", backgroundColor: "#FAFAF9" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6B6B6B" }}>
              Homepage placement
            </p>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.is_featured}
                  onChange={(e) => update("is_featured", e.target.checked ? "true" : "")}
                  className="w-4 h-4 rounded"
                />
                <div>
                  <p className="text-sm font-bold" style={{ color: "#0D0D0D" }}>Hero post</p>
                  <p className="text-xs" style={{ color: "#6B6B6B" }}>Large card on the left of the spotlight panel</p>
                </div>
              </label>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
                  Spotlight position (1, 2 or 3 — sidebar)
                </label>
                <select
                  value={state.spotlight_order}
                  onChange={(e) => update("spotlight_order", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none"
                  style={{ borderColor: "#E2E0DC" }}
                >
                  <option value="">Not in spotlight</option>
                  <option value="1">Position 1 (top)</option>
                  <option value="2">Position 2 (middle)</option>
                  <option value="3">Position 3 (bottom)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Preview + publish */}
      {step === 5 && (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold" style={{ color: "#0D0D0D" }}>
            Ready to publish?
          </h2>
          <div
            className="rounded-2xl border p-6 flex flex-col gap-3"
            style={{ borderColor: "#E2E0DC" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6B6B6B" }}>
              {state.content_type}
            </p>
            <h3 className="text-xl font-extrabold" style={{ color: "#0D0D0D" }}>
              {state.title || "Untitled"}
            </h3>
            {state.excerpt && (
              <p className="text-sm" style={{ color: "#6B6B6B" }}>{state.excerpt}</p>
            )}
            {state.youtube_embed_id && (
              <p className="text-xs" style={{ color: "#39E75F" }}>
                YouTube: {state.youtube_embed_id}
              </p>
            )}
            {state.category && (
              <p className="text-xs" style={{ color: "#6B6B6B" }}>
                Category: {state.category}
              </p>
            )}
            {state.tags && (
              <p className="text-xs" style={{ color: "#6B6B6B" }}>
                Tags: {state.tags}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={publish}
              disabled={publishing}
              className="flex-1 py-4 rounded-full text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
            >
              {publishing ? "Publishing..." : "Publish Now"}
            </button>
            <button
              onClick={() => router.push("/admin")}
              className="flex-1 py-4 rounded-full text-sm font-medium border transition-colors"
              style={{ borderColor: "#0D0D0D", color: "#0D0D0D" }}
            >
              Save as Draft
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: "#6B6B6B" }}
          >
            &larr; Back
          </button>
        ) : (
          <div />
        )}
        {step < 5 && (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canAdvance()}
            className="px-6 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ backgroundColor: "#0D0D0D", color: "#F8F7F4" }}
          >
            Continue &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
