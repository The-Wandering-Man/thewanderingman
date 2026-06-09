"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SponsorData {
  id?: string;
  org_name?: string;
  slug?: string;
  tier?: string;
  tagline?: string;
  use_landing_page?: boolean;
  external_url?: string;
  lp_hero_headline?: string;
  lp_hero_subheading?: string;
  lp_about?: string;
  lp_offer?: string;
  lp_offer_cta_text?: string;
  lp_offer_cta_url?: string;
  lp_services?: string[];
  lp_color_primary?: string;
  address?: string;
  suburb?: string;
  phone?: string;
  website_url?: string;
  opening_hours?: string;
  contact_name?: string;
  contact_email?: string;
  renewal_date?: string;
  is_active?: boolean;
}

const inputClass =
  "w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 bg-transparent";
const inputStyle = { borderColor: "rgba(248,247,244,0.2)", color: "#F8F7F4" };

const labelStyle = { color: "rgba(248,247,244,0.6)" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={labelStyle}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function SponsorForm({ sponsor }: { sponsor?: SponsorData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    org_name: sponsor?.org_name ?? "",
    slug: sponsor?.slug ?? "",
    tier: sponsor?.tier ?? "community",
    tagline: sponsor?.tagline ?? "",
    use_landing_page: sponsor?.use_landing_page ?? true,
    external_url: sponsor?.external_url ?? "",
    lp_hero_headline: sponsor?.lp_hero_headline ?? "",
    lp_hero_subheading: sponsor?.lp_hero_subheading ?? "",
    lp_about: sponsor?.lp_about ?? "",
    lp_offer: sponsor?.lp_offer ?? "",
    lp_offer_cta_text: sponsor?.lp_offer_cta_text ?? "",
    lp_offer_cta_url: sponsor?.lp_offer_cta_url ?? "",
    lp_services_raw: sponsor?.lp_services?.join("\n") ?? "",
    lp_color_primary: sponsor?.lp_color_primary ?? "#0D0D0D",
    address: sponsor?.address ?? "",
    suburb: sponsor?.suburb ?? "",
    phone: sponsor?.phone ?? "",
    website_url: sponsor?.website_url ?? "",
    opening_hours: sponsor?.opening_hours ?? "",
    contact_name: sponsor?.contact_name ?? "",
    contact_email: sponsor?.contact_email ?? "",
    renewal_date: sponsor?.renewal_date ?? "",
    is_active: sponsor?.is_active ?? true,
  });

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function slugify(val: string) {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        lp_services: form.lp_services_raw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        slug: form.slug || slugify(form.org_name),
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { lp_services_raw, ...rest } = payload;

      const res = await fetch("/api/admin/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sponsor?.id, ...rest }),
      });
      if (!res.ok) throw new Error("Save failed");
      router.push("/admin/sponsors");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const sectionHead = "text-xs font-extrabold uppercase tracking-widest pt-6 pb-2 border-t";
  const sectionStyle = { borderColor: "rgba(248,247,244,0.1)", color: "rgba(248,247,244,0.4)" };

  return (
    <div className="space-y-5">
      {/* Core */}
      <Field label="Organisation name">
        <input
          className={inputClass}
          style={inputStyle}
          value={form.org_name}
          onChange={(e) => {
            set("org_name", e.target.value);
            if (!sponsor?.slug) set("slug", slugify(e.target.value));
          }}
        />
      </Field>
      <Field label="URL slug">
        <input
          className={inputClass}
          style={inputStyle}
          value={form.slug}
          onChange={(e) => set("slug", slugify(e.target.value))}
          placeholder="auto-generated from name"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Tier">
          <select
            className={inputClass}
            style={{ ...inputStyle, backgroundColor: "#0D0D0D" }}
            value={form.tier}
            onChange={(e) => set("tier", e.target.value)}
          >
            {["gold", "silver", "bronze", "community"].map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </Field>
        <Field label="Active">
          <select
            className={inputClass}
            style={{ ...inputStyle, backgroundColor: "#0D0D0D" }}
            value={form.is_active ? "true" : "false"}
            onChange={(e) => set("is_active", e.target.value === "true")}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </Field>
      </div>
      <Field label="Tagline (shown in banner)">
        <input className={inputClass} style={inputStyle} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
      </Field>

      {/* Landing page toggle */}
      <p className={sectionHead} style={sectionStyle}>Landing page</p>
      <Field label="Use TWM landing page?">
        <select
          className={inputClass}
          style={{ ...inputStyle, backgroundColor: "#0D0D0D" }}
          value={form.use_landing_page ? "true" : "false"}
          onChange={(e) => set("use_landing_page", e.target.value === "true")}
        >
          <option value="true">Yes - build a landing page on TWM</option>
          <option value="false">No - link directly to their website</option>
        </select>
      </Field>
      {!form.use_landing_page && (
        <Field label="External URL">
          <input className={inputClass} style={inputStyle} value={form.external_url} onChange={(e) => set("external_url", e.target.value)} />
        </Field>
      )}
      {form.use_landing_page && (
        <>
          <Field label="Hero headline">
            <input className={inputClass} style={inputStyle} value={form.lp_hero_headline} onChange={(e) => set("lp_hero_headline", e.target.value)} />
          </Field>
          <Field label="Hero subheading">
            <input className={inputClass} style={inputStyle} value={form.lp_hero_subheading} onChange={(e) => set("lp_hero_subheading", e.target.value)} />
          </Field>
          <Field label="About (separate paragraphs with a blank line)">
            <textarea
              className={inputClass}
              style={{ ...inputStyle, resize: "vertical" }}
              rows={7}
              value={form.lp_about}
              onChange={(e) => set("lp_about", e.target.value)}
            />
          </Field>
          <Field label="Member offer text">
            <input className={inputClass} style={inputStyle} value={form.lp_offer} onChange={(e) => set("lp_offer", e.target.value)} placeholder="10% off when you mention The Wandering Man" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Offer CTA text">
              <input className={inputClass} style={inputStyle} value={form.lp_offer_cta_text} onChange={(e) => set("lp_offer_cta_text", e.target.value)} />
            </Field>
            <Field label="Offer CTA URL">
              <input className={inputClass} style={inputStyle} value={form.lp_offer_cta_url} onChange={(e) => set("lp_offer_cta_url", e.target.value)} />
            </Field>
          </div>
          <Field label="Services / products (one per line)">
            <textarea
              className={inputClass}
              style={{ ...inputStyle, resize: "vertical" }}
              rows={5}
              value={form.lp_services_raw}
              onChange={(e) => set("lp_services_raw", e.target.value)}
            />
          </Field>
          <Field label="Brand accent colour (hex)">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.lp_color_primary}
                onChange={(e) => set("lp_color_primary", e.target.value)}
                className="h-10 w-14 rounded cursor-pointer border-0"
              />
              <input
                className={inputClass}
                style={inputStyle}
                value={form.lp_color_primary}
                onChange={(e) => set("lp_color_primary", e.target.value)}
              />
            </div>
          </Field>
        </>
      )}

      {/* Contact & location */}
      <p className={sectionHead} style={sectionStyle}>Contact &amp; location</p>
      <Field label="Address">
        <input className={inputClass} style={inputStyle} value={form.address} onChange={(e) => set("address", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Suburb">
          <input className={inputClass} style={inputStyle} value={form.suburb} onChange={(e) => set("suburb", e.target.value)} />
        </Field>
        <Field label="Phone">
          <input className={inputClass} style={inputStyle} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </Field>
      </div>
      <Field label="Website URL">
        <input className={inputClass} style={inputStyle} value={form.website_url} onChange={(e) => set("website_url", e.target.value)} />
      </Field>
      <Field label="Opening hours">
        <input className={inputClass} style={inputStyle} value={form.opening_hours} onChange={(e) => set("opening_hours", e.target.value)} placeholder="Mon-Fri: 9am - 5pm · Sat: 9am - 12pm" />
      </Field>

      {/* Admin */}
      <p className={sectionHead} style={sectionStyle}>Admin</p>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Contact name">
          <input className={inputClass} style={inputStyle} value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} />
        </Field>
        <Field label="Contact email">
          <input className={inputClass} style={inputStyle} value={form.contact_email} onChange={(e) => set("contact_email", e.target.value)} />
        </Field>
      </div>
      <Field label="Renewal date">
        <input type="date" className={inputClass} style={{ ...inputStyle, backgroundColor: "#0D0D0D" }} value={form.renewal_date} onChange={(e) => set("renewal_date", e.target.value)} />
      </Field>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="pt-4">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
        >
          {saving ? "Saving..." : "Save sponsor"}
        </button>
      </div>
    </div>
  );
}
