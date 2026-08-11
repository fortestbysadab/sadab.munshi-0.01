"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutContent() {
  const { t } = useLanguage();

  // Press-and-hold colour reveal on touch devices.
  // CSS :active is unreliable on some Android browsers, so the state is
  // toggled explicitly; desktop keeps the pure CSS hover: variant.
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="container-page pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-3xl">
        <PageHeader title={t.about.title} />

        {/* Portrait (the arch motif) + intro */}
        <Reveal className="mt-14">
          <div className="flex flex-col items-start gap-10 sm:flex-row sm:items-center">
            <div className="shrink-0">
              <div className="arch-top rotate-[-2deg] bg-forest/[0.05] p-1.5 ring-1 ring-forest/[0.07] shadow-soft">
                <div
                  onTouchStart={() => setIsPressed(true)}
                  onTouchEnd={() => setIsPressed(false)}
                  onTouchCancel={() => setIsPressed(false)}
                  className="group arch-top relative aspect-[4/5] w-32 overflow-hidden bg-clay-soft"
                >
                  <Image
                    src="/assets/images/about-s-m.webp"
                    alt={t.about.title}
                    fill
                    priority
                    sizes="128px"
                    draggable={false}
                    className={`select-none object-cover object-top transition-[filter,transform] duration-700 ease-spring group-hover:scale-105 hover:grayscale-0 group-hover:grayscale-0 ${
                      isPressed ? "grayscale-0" : "grayscale"
                    }`}
                  />
                </div>
              </div>
            </div>
            <article className="prose-doc">
              <p className="lead font-serif text-xl leading-[1.4] text-forest md:text-display-sm md:leading-[1.35]">
                {t.about.intro}
              </p>
            </article>
          </div>
        </Reveal>

        <Reveal>
          <article className="prose-doc mt-10">
            <p>{t.about.body}</p>
          </article>
        </Reveal>

        {/* Now */}
        <Reveal className="mt-20">
          <section>
            <h2 className="headline-serif text-3xl leading-[1.12] md:text-4xl">
              {t.about.nowTitle}
            </h2>
            <p className="mt-3 text-body-md text-forest-soft">
              {t.about.nowSubtitle}
            </p>

            <div className="shell mt-8">
              <ol className="panel flex flex-col divide-y divide-stone/70 p-2">
                {t.about.nowDoing.map((item, i) => (
                  <li key={i} className="flex gap-4 px-5 py-4 md:gap-5 md:px-6 md:py-5">
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 font-mono text-sm tabular-nums text-forest-mute"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body-md text-forest-soft">
                      {i === 1 ? (
                        <>
                          {item}{" "}
                          <a
                            href="https://app.sadabmunshi.online"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-inline inline-flex items-center"
                            aria-label="Open the app"
                          >
                            <ArrowUpRight size={16} weight="regular" aria-hidden />
                          </a>
                        </>
                      ) : (
                        item
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-6 text-body-sm text-forest-soft">
              <Link href={t.about.watchingLink} className="link-inline">
                {t.about.watchingLinkLabel}
              </Link>
            </p>
          </section>
        </Reveal>

        {/* Closing — one middot max, no em-dash */}
        <Reveal>
          <p className="mt-20 font-serif text-display-sm leading-[1.4] text-forest">
            <Link href="/projects" className="link-inline">
              {t.about.closingProjects}
            </Link>{" "}
            ·{" "}
            <Link href="/blog" className="link-inline">
              {t.about.closingBlog}
            </Link>
            . {t.about.closingLine}
          </p>
        </Reveal>
      </div>
    </div>
  );
}
