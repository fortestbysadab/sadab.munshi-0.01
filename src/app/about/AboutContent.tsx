"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  ChartPie,
  PencilSimple,
} from "@phosphor-icons/react";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const A = "/assets/images/about";

// Rounded-square icon boxes beside each "Now" number (light-stroke Phosphor).
const NOW_ICONS = [BookOpen, Briefcase, ChartPie, PencilSimple];

/**
 * About page — warm editorial "scrapbook" treatment (scoped to this page:
 * polaroid photo, hand-drawn squiggle/arrows, stamp badge, notebook
 * illustration, postcard CTA). Rest of the site is untouched.
 */
export default function AboutContent() {
  const { t } = useLanguage();

  // The translated label still carries a plain "→" character; the hand-drawn
  // arrow asset replaces it, so strip the character from the rendered label.
  const watchingLabel = t.about.watchingLinkLabel.replace(/\s*[→↗]+\s*$/u, "").trim();

  return (
    <div className="container-page pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-5xl">
        {/* Heading + hand-drawn squiggle underline */}
        <Reveal>
          <header className="flex flex-col items-start">
            <h1 className="headline-serif text-4xl leading-[1.1] md:text-6xl md:leading-[1.08]">
              {t.about.title}
            </h1>
            <Image
              src={`${A}/about-underline-squiggle.webp`}
              alt=""
              aria-hidden
              width={200}
              height={67}
              className="mt-2 h-auto w-32 md:w-44"
            />
          </header>
        </Reveal>

        {/* Intro: polaroid + words. Notebook illustration rests top-right on
            tablet/desktop; phones get a small copy below the intro instead. */}
        <Reveal className="mt-14">
          <section className="relative">
            <Image
              src={`${A}/about-notebook-pen.webp`}
              alt=""
              aria-hidden
              width={400}
              height={366}
              className="absolute right-0 top-0 hidden h-auto w-[160px] rotate-6 md:block lg:w-[150px]"
            />

            <div className="flex flex-col gap-10 sm:flex-row sm:items-start">
              {/* Polaroid (frame, tape and aged edges are baked into the asset)
                  + stamp badge overlapping the bottom-right corner */}
              <div className="relative w-fit shrink-0">
                <Image
                  src={`${A}/about-profile-polaroid.webp`}
                  alt="Portrait of Sadab Munshi"
                  width={500}
                  height={592}
                  priority
                  className="h-auto w-44 -rotate-2 md:w-52"
                />
                <Image
                  src={`${A}/about-stamp-badge.webp`}
                  alt=""
                  aria-hidden
                  width={250}
                  height={250}
                  className="absolute -bottom-5 -right-6 h-auto w-16 rotate-12 md:w-20"
                />
              </div>

              <div className="max-w-prose md:pr-[185px] lg:pr-[250px]">
                <p className="font-serif text-xl leading-[1.4] text-forest md:text-display-sm md:leading-[1.35]">
                  {t.about.intro}
                </p>
                <span aria-hidden className="mt-6 block h-px w-10 bg-forest/25" />
                <p className="mt-6 text-body-md leading-[1.7] text-forest-soft">
                  {t.about.body}
                </p>
                {/* Phones only: small notebook resting below the intro text,
                    right-aligned so it never interrupts the reading column */}
                <Image
                  src={`${A}/about-notebook-pen.webp`}
                  alt=""
                  aria-hidden
                  width={400}
                  height={366}
                  className="ml-auto mt-8 h-auto w-24 rotate-6 md:hidden"
                />
              </div>
            </div>
          </section>
        </Reveal>

        {/* Now */}
        <Reveal className="mt-20 md:mt-24">
          <section>
            <h2 className="headline-serif text-3xl leading-[1.12] md:text-4xl">
              {t.about.nowTitle}
            </h2>
            {/* Italic handwriting-style subtitle (serif italic, not body) */}
            <p className="mt-2 font-serif text-lg italic text-forest-soft">
              {t.about.nowSubtitle}
            </p>

            <div className="shell mt-8">
              <ol className="panel flex flex-col divide-y divide-stone/70 p-2">
                {t.about.nowDoing.map((item, i) => {
                  const Icon = NOW_ICONS[i % NOW_ICONS.length];
                  return (
                    <li key={i} className="flex items-start gap-4 px-5 py-4 md:gap-5 md:px-6 md:py-5">
                      <span
                        aria-hidden
                        className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-clay-soft text-forest ring-1 ring-stone"
                      >
                        <Icon size={18} weight="light" />
                      </span>
                      <span
                        aria-hidden
                        className="mt-2.5 shrink-0 font-mono text-sm tabular-nums text-forest-mute"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-1.5 text-body-md text-forest-soft">
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
                  );
                })}
              </ol>
            </div>

            {/* Hand-drawn arrows replace the plain arrow character */}
            <p className="mt-7">
              <Link href={t.about.watchingLink} className="link-quiet">
                <Image
                  src={`${A}/about-arrow-icon.webp`}
                  alt=""
                  aria-hidden
                  width={150}
                  height={50}
                  className="h-4 w-auto"
                />
                {watchingLabel}
                <Image
                  src={`${A}/about-arrow-icon.webp`}
                  alt=""
                  aria-hidden
                  width={150}
                  height={50}
                  className="h-4 w-auto"
                />
              </Link>
            </p>
          </section>
        </Reveal>

        {/* Bottom CTA card — cream block, postcard bottom-right */}
        <Reveal className="mt-16 md:mt-20">
          <section className="relative overflow-hidden rounded-2xl bg-clay-soft ring-1 ring-stone">
            <div className="relative z-10 flex flex-col items-start gap-3 p-5 pr-24 sm:gap-4 sm:p-7 sm:pr-36 md:p-10 md:pr-52">
              <p className="eyebrow">
                {t.about.closingProjects} · {t.about.closingBlog}
              </p>
              <h2 className="headline-serif text-2xl leading-[1.15] sm:text-3xl sm:leading-[1.12] md:text-4xl">
                {t.about.closingLine}
              </h2>
              <Link href="/projects" className="btn-primary mt-1">
                Explore my work
                <span className="btn-ico" aria-hidden>
                  <ArrowRight size={16} weight="bold" />
                </span>
              </Link>
            </div>
            <Image
              src={`${A}/about-cta-postcard.webp`}
              alt=""
              aria-hidden
              width={200}
              height={133}
              className="absolute bottom-3 right-3 h-auto w-16 rotate-[8deg] sm:-bottom-3 sm:right-2 sm:w-28 md:right-6 md:w-36"
            />
          </section>
        </Reveal>
      </div>
    </div>
  );
}
