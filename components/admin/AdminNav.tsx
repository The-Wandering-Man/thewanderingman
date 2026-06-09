"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "New Post", href: "/admin/posts/new" },
  { label: "New Event", href: "/admin/events/new" },
  { label: "Sponsors", href: "/admin/sponsors" },
  { label: "Community", href: "/admin/community" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{ backgroundColor: "#0D0D0D", borderColor: "#1A1A1A" }}
    >
      <div className="flex items-center gap-6">
        <span className="text-sm font-bold" style={{ color: "#39E75F" }}>
          TWM Admin
        </span>
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: active ? "#F8F7F4" : "#6B6B6B", fontWeight: active ? 700 : 400 }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
      <button
        onClick={signOut}
        className="text-xs hover:opacity-70 transition-opacity"
        style={{ color: "#6B6B6B" }}
      >
        Sign out
      </button>
    </nav>
  );
}
