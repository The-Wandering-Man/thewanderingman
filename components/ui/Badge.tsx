type ContentType = "article" | "interview" | "talk" | "update" | string;

const palette: Record<string, { bg: string; color: string }> = {
  article: { bg: "#E8F5E9", color: "#2E7D32" },
  interview: { bg: "#E3F2FD", color: "#1565C0" },
  talk: { bg: "#F3E5F5", color: "#6A1B9A" },
  update: { bg: "#FFF8E1", color: "#F57F17" },
  default: { bg: "#F5F5F5", color: "#424242" },
};

export default function Badge({ type }: { type: ContentType }) {
  const label = type.charAt(0).toUpperCase() + type.slice(1);
  const { bg, color } = palette[type] ?? palette.default;
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide"
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  );
}
