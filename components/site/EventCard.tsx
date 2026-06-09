import Link from "next/link";

export interface Event {
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
}

const typeColour: Record<string, { bg: string; color: string }> = {
  weekly: { bg: "#E8F5E9", color: "#2E7D32" },
  monthly: { bg: "#E3F2FD", color: "#1565C0" },
  special: { bg: "#FFF8E1", color: "#F57F17" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function EventCard({ event }: { event: Event }) {
  const colour = typeColour[event.event_type ?? ""] ?? { bg: "#F5F5F5", color: "#424242" };

  return (
    <div
      className="rounded-2xl border p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
      style={{ borderColor: "#E2E0DC" }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide"
          style={{ backgroundColor: colour.bg, color: colour.color }}
        >
          {event.event_type ?? "event"}
        </span>
        {event.is_recurring && event.recurrence_label && (
          <span className="text-xs" style={{ color: "#6B6B6B" }}>
            {event.recurrence_label}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold mb-1" style={{ color: "#0D0D0D" }}>
          {event.title}
        </h3>
        {event.description && (
          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#6B6B6B" }}>
            {event.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 text-sm" style={{ color: "#6B6B6B" }}>
        <p>
          <span className="font-medium" style={{ color: "#0D0D0D" }}>
            {formatDate(event.starts_at)}
          </span>{" "}
          at {formatTime(event.starts_at)}
        </p>
        {event.location_name && <p>{event.location_name}</p>}
        {event.location_address && <p>{event.location_address}</p>}
      </div>

      <div className="flex gap-3 mt-auto pt-2">
        <Link
          href={`/events/${event.slug}`}
          className="text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
          style={{ color: "#0D0D0D" }}
        >
          Details
        </Link>
        {event.rsvp_url && (
          <a
            href={event.rsvp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold px-4 py-1.5 rounded-full transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
          >
            RSVP
          </a>
        )}
      </div>
    </div>
  );
}
