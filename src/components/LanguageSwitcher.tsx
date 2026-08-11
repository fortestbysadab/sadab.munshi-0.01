"use client";

import { useLanguage, type Locale } from "@/context/LanguageContext";

const OPTIONS: { value: Locale; label: string; title: string }[] = [
  { value: "auto", label: "Auto", title: "Auto-detect language" },
  { value: "en", label: "EN", title: "English" },
  { value: "bn", label: "বাং", title: "বাংলা" },
  { value: "hi", label: "हि", title: "हिन्दी" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.langSwitcher.auto}
      className="flex items-center gap-0.5 rounded-full border border-forest/[0.08] bg-forest/[0.045] p-1"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          title={opt.title}
          onClick={() => setLocale(opt.value)}
          aria-pressed={locale === opt.value}
          className={[
            "h-7 rounded-full px-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-all duration-300 ease-spring active:scale-95",
            locale === opt.value
              ? "bg-paper font-medium text-forest shadow-soft"
              : "text-forest-mute hover:text-forest",
          ].join(" ")}
        >
          {opt.value === "auto" ? t.langSwitcher.auto : opt.label}
        </button>
      ))}
    </div>
  );
}
