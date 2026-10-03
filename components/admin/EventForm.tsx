"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface EventFormProps {
  initial?: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    event_type: string | null;
    location_name: string | null;
    location_address: string | null;
    starts_at: string;
    ends_at: string | null;
    is_recurring: boolean;
    recurrence_label: string | null;
    rsvp_url: string | null;
    is_active: boolean;
  };
}

function toDatetimeLocal(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 16);
}

export default function EventForm({ initial }: EventFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    event_type: initial?.event_type ?? "weekly",
    location_name: initial?.location_name ?? "",
    location_address: initial?.location_address ?? "",
    starts_at: toDatetimeLocal(initial?.starts_at ?? null),
    ends_at: toDatetimeLocal(initial?.ends_at ?? null),
    is_recurring: initial?.is_recurring ?? false,
    recurrence_label: initial?.recurrence_label ?? "",
    rsvp_url: initial?.rsvp_url ?? "",
    is_active: initial?.is_active ?? true,
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.starts_at) { setError("Start date/time is required."); return; }
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      slug: initial?.slug ?? slugify(form.title),
      description: form.description || null,
      event_type: form.event_type || null,
      location_name: form.location_name || null,
      location_address: form.location_address || null,
      starts_at: new Date(form.starts_at).toISOString(),
      ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
      is_recurring: form.is_recurring,
      recurrence_label: form.recurrence_label || null,
      rsvp_url: form.rsvp_url || null,
      is_active: form.is_active,
    };

    if (initial?.id) {
      const { error: err } = await supabase.from("events").update(payload).eq("id", initial.id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase.from("events").insert(payload);
      if (err) { setError(err.message); setSaving(false); return; }
    }

    router.push("/admin");
    router.refresh();
  }

  const labelClass = "block text-xs font-bold uppercase tracking-widest mb-2";
  const labelStyle = { color: "#6B6B6B" };
  const inputClass = "w-full px-4 py-3 rounded-xl text-sm border focus:outline-none";
  const inputStyle = { borderColor: "#E2E0DC" };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-6">
      <h1 className="text-2xl font-extrabold" style={{ color: "#0D0D0D" }}>
        {initial ? "Edit Event" : "New Event"}
      </h1>

      <div>
        <label className={labelClass} style={labelStyle}>Title *</label>
        <input required type="text" value={form.title} onChange={(e) => update("title", e.target.value)}
          className={inputClass} style={inputStyle} placeholder="Saturday Morning Walk" />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Description</label>
        <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)}
          className={inputClass} style={{ ...inputStyle, resize: "vertical" }}
          placeholder="What happens at this event? Who's it for?" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={labelStyle}>Event Type</label>
          <select value={form.event_type} onChange={(e) => update("event_type", e.target.value)}
            className={inputClass} style={inputStyle}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="special">Special</option>
            <option value="workplace">Workplace</option>
          </select>
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_recurring}
              onChange={(e) => update("is_recurring", e.target.checked)}
              className="w-4 h-4 rounded" />
            <span className="text-sm font-medium" style={{ color: "#0D0D0D" }}>Recurring event</span>
          </label>
        </div>
      </div>

      {form.is_recurring && (
        <div>
          <label className={labelClass} style={labelStyle}>Recurrence Label</label>
          <input type="text" value={form.recurrence_label}
            onChange={(e) => update("recurrence_label", e.target.value)}
            className={inputClass} style={inputStyle} placeholder="Every Saturday 7am" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={labelStyle}>Start Date & Time *</label>
          <input required type="datetime-local" value={form.starts_at}
            onChange={(e) => update("starts_at", e.target.value)}
            className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>End Date & Time</label>
          <input type="datetime-local" value={form.ends_at}
            onChange={(e) => update("ends_at", e.target.value)}
            className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Location Name</label>
        <input type="text" value={form.location_name}
          onChange={(e) => update("location_name", e.target.value)}
          className={inputClass} style={inputStyle} placeholder="Geelong Waterfront" />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>Location Address</label>
        <input type="text" value={form.location_address}
          onChange={(e) => update("location_address", e.target.value)}
          className={inputClass} style={inputStyle} placeholder="Eastern Beach Reserve, Geelong VIC 3220" />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>RSVP URL</label>
        <input type="url" value={form.rsvp_url}
          onChange={(e) => update("rsvp_url", e.target.value)}
          className={inputClass} style={inputStyle} placeholder="https://..." />
        <p className="text-xs mt-1" style={{ color: "#6B6B6B" }}>Leave blank if no RSVP needed — we'll say "just show up".</p>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="is_active" checked={form.is_active}
          onChange={(e) => update("is_active", e.target.checked)}
          className="w-4 h-4 rounded" />
        <label htmlFor="is_active" className="text-sm font-medium cursor-pointer" style={{ color: "#0D0D0D" }}>
          Active (visible on the site)
        </label>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="flex-1 py-4 rounded-full text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}>
          {saving ? "Saving..." : initial ? "Save Changes" : "Create Event"}
        </button>
        <button type="button" onClick={() => router.push("/admin")}
          className="flex-1 py-4 rounded-full text-sm font-medium border transition-colors"
          style={{ borderColor: "#0D0D0D", color: "#0D0D0D" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
