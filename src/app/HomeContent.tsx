"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "@phosphor-icons/react";
import MeshHero from "@/components/MeshHero";
import Reveal from "@/components/Reveal";
import { formatDateLong } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import type { BlogPostMeta } from "@/lib/posts";

export default function HomeContent({ posts }: { posts: BlogPostMeta[] }) {
  const { t } = useLanguage();
  const mood = t.home.moods[new Date().getDate() % t.home.moods.length];

  const [heroLine1, heroLine2] = t.home.heroTitle.split("\n");
  const [featured, ...rest] = posts;

  return (
    <>
      {/* ───────── Botanical hero ───────── */}
      <MeshHero>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Left: headline */}
          <div className="flex max-w-2xl flex-col items-start gap-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-stone bg-paper/70 px-4 py-1.5 backdrop-blur-sm">
              <Leaf size={14} weight="light" className="text-terracotta-deep" />
              <span className="eyebrow">{t.home.tagline}</span>
            </span>

            <h1 className="headline-serif text-4xl leading-[1.08] md:text-7xl md:leading-[1.06]">
              {heroLine1}
              <br />
              {/* pb-1 reserves descender clearance for the italic glyph */}
              <span className="italic-accent inline-block pb-1">{heroLine2}</span>
            </h1>

            <p className="max-w-xl text-body-md text-forest-soft md:text-body-lg">
              {t.home.heroBody}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-6">
              <Link href="/projects" className="btn-primary">
                {t.home.ctaBuild}
                <span className="btn-ico" aria-hidden>
                  <ArrowRight size={16} weight="bold" />
                </span>
              </Link>
              <Link href="/blog" className="link-quiet">
                {t.home.ctaBlog}
                <ArrowRight size={15} weight="bold" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Right: arched portrait in a double-bezel tray (the arch motif) */}
          <Reveal delay={150} className="mx-auto w-full max-w-[300px] sm:max-w-sm lg:justify-self-end">
            <div className="arch-top rotate-[-1.5deg] bg-forest/[0.05] p-2.5 ring-1 ring-forest/[0.07] shadow-medium md:rotate-[-2deg]">
              <div className="arch-top relative aspect-[4/5] overflow-hidden bg-clay-soft">
                <Image
                  src="/assets/images/sadab-portrait.jpg"
                  alt={t.home.signature}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover transition-transform duration-700 ease-spring hover:scale-[1.03]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </MeshHero>

      {/* ───────── Intro + today's note ───────── */}
      <section className="border-t border-stone">
        <div className="container-page py-16 md:py-36">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <Reveal>
              <p className="max-w-prose font-serif text-[22px] font-normal leading-[1.45] text-forest md:text-[30px] md:leading-[1.4]">
                {t.home.introBody}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <aside className="shell">
                <div className="panel flex flex-col gap-4 p-6 md:p-8">
                  <p className="eyebrow flex items-center gap-2">
                    <Leaf size={13} weight="light" className="text-terracotta-deep" />
                    {t.home.todayNote}
                  </p>
                  <p className="font-serif text-xl font-normal italic leading-[1.4] text-forest md:text-2xl">
                    {mood}
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Recent writing (featured + asymmetric pair) ───────── */}
      <section className="border-t border-stone bg-clay-soft/50">
        <div className="container-page py-16 md:py-36">
          <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:mb-14">
            <h2 className="headline-serif text-3xl leading-[1.12] md:text-5xl">
              {t.home.recentTitle}
            </h2>
            <Link href="/blog" className="link-quiet shrink-0">
              {t.home.allWriting}
            </Link>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Featured: newest post, full-width horizontal */}
            {featured && (
              <Reveal className="md:col-span-2">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="shell card-lift group block h-full"
                >
                  <div className="panel grid h-full overflow-hidden md:grid-cols-[1.1fr_1fr]">
                    {featured.coverImage && (
                      <div className="relative aspect-[512/279] w-full overflow-hidden bg-clay-soft md:aspect-auto md:h-full md:min-h-[300px]">
                        <Image
                          src={featured.coverImage}
                          alt={featured.title}
                          width={512}
                          height={279}
                          sizes="(max-width: 768px) 100vw, 45vw"
                          className="h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-4 p-6 md:p-10">
                      <p className="font-mono text-caption uppercase tracking-[0.14em] text-forest-mute">
                        {formatDateLong(featured.date)}
                      </p>
                      <h3 className="font-serif text-display-sm text-forest md:text-display-md">
                        {featured.title}
                      </h3>
                      <p className="max-w-prose text-body-md text-forest-soft">
                        {featured.excerpt}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-forest transition-colors duration-300 group-hover:text-terracotta">
                        {t.home.readMore}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )}

            {/* Remaining pair */}
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={100 + i * 90} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="shell card-lift group flex h-full flex-col"
                >
                  <div className="panel flex h-full flex-col overflow-hidden">
                    {post.coverImage && (
                      <div className="relative aspect-[512/279] w-full overflow-hidden bg-clay-soft">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          width={512}
                          height={279}
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
                      <p className="font-mono text-caption uppercase tracking-[0.14em] text-forest-mute">
                        {formatDateLong(post.date)}
                      </p>
                      <h3 className="font-serif text-display-sm text-forest">
                        {post.title}
                      </h3>
                      <p className="text-body-sm text-forest-soft">{post.excerpt}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-forest transition-colors duration-300 group-hover:text-terracotta">
                        {t.home.readMore}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Signature — quiet, static, one accent dot ───────── */}
      <section className="border-t border-stone">
        <div className="container-page py-20 text-center md:py-40">
          <Reveal>
            <p className="font-serif text-4xl italic leading-[1.15] tracking-[-0.02em] text-forest md:text-6xl">
              {t.home.signature}
              <span aria-hidden className="not-italic text-terracotta">.</span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
