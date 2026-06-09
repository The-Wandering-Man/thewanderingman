"use client";

import Image from "next/image";
import { useState } from "react";

export default function YoutubeEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      className="relative w-full rounded-lg overflow-hidden group cursor-pointer"
      style={{ paddingBottom: "56.25%" }}
      onClick={() => setActive(true)}
      aria-label={`Play ${title}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {/* Play button */}
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
          style={{ backgroundColor: "rgba(13,13,13,0.8)" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path d="M8 5l11 7-11 7V5z" fill="#39E75F" />
          </svg>
        </span>
      </span>
    </button>
  );
}
