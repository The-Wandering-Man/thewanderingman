import { type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const styles: Record<Variant, { bg: string; color: string; border?: string }> =
  {
    primary: { bg: "#39E75F", color: "#0D0D0D" },
    secondary: { bg: "transparent", color: "#0D0D0D", border: "#0D0D0D" },
    ghost: { bg: "transparent", color: "#6B6B6B" },
  };

export default function Button({
  variant = "primary",
  children,
  className = "",
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const s = styles[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-80 disabled:opacity-40 ${className}`}
      style={{
        backgroundColor: s.bg,
        color: s.color,
        border: s.border ? `1px solid ${s.border}` : undefined,
      }}
    >
      {children}
    </button>
  );
}
