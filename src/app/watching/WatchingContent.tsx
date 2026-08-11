"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const lastUpdated = "February 2026";

export default function WatchingContent() {
  const { t } = useLanguage();

  return (
    <div className="container-page pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-2xl">
        <PageHeader title={t.watching.title} description={t.watching.description} />

        <Reveal>
          <p className="mt-10 max-w-prose text-body-lg text-forest-soft">
            {t.watching.intro}
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-14">
          {t.watching.sections.map((section, s) => (
            <Reveal key={section.category} delay={s * 80}>
              <section>
                <h2 className="mb-3 font-serif text-display-sm text-forest">
                  {section.category}
                </h2>
                {/* Grouped hairline rows (one border family, not cards) */}
                <ul className="divide-y divide-stone/70 border-t border-stone">
                  {section.items.map((item) => (
                    <li
                      key={item.title}
                      className="-mx-3 rounded-lg px-3 py-4 transition-colors duration-300 hover:bg-forest/[0.035]"
                    >
                      <div className="text-body-md font-semibold text-forest">
                        {item.title}{" "}
                        <span className="font-mono text-sm font-normal text-forest-mute">
                          ({item.year})
                        </span>
                      </div>
                      <p className="mt-1 text-body-sm text-forest-soft">
                        {item.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>

        <p className="mt-14 font-mono text-caption uppercase tracking-[0.14em] text-forest-mute">
          {t.watching.lastUpdated} {lastUpdated}
        </p>
        <p className="mt-4 text-body-sm text-forest-soft">
          {t.watching.recommendation}{" "}
          <Link href="/contact" className="link-inline">
            {t.watching.recommendationLink}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
