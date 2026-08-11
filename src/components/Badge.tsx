import { ReactNode } from "react";

export default function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent";
}) {
  const tones = {
    default: "border-stone bg-transparent text-forest-soft",
    accent: "border-terracotta/30 bg-terracotta-soft text-terracotta-deep",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
