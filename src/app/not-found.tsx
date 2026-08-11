"use client";

import Link from "next/link";
import { HouseLine } from "@phosphor-icons/react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="container-page flex min-h-[100dvh] flex-col items-center justify-center pb-24 pt-28 text-center">
      <p className="font-serif text-5xl italic text-forest/30 md:text-6xl">
        {t.notFound.emoji}
      </p>
      <h1 className="mt-8 headline-serif text-5xl md:text-6xl">
        {t.notFound.title}
      </h1>
      <p className="mt-5 max-w-prose text-body-lg text-forest-soft">
        {t.notFound.body}
      </p>
      <Link href="/" className="btn-primary mt-10">
        {t.notFound.cta}
        <span className="btn-ico" aria-hidden>
          <HouseLine size={16} weight="bold" />
        </span>
      </Link>
    </div>
  );
}
