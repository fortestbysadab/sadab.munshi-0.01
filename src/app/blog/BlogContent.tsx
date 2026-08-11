"use client";

import Image from "next/image";
import Link from "next/link";
import { Notebook } from "@phosphor-icons/react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import type { BlogPostMeta } from "@/lib/posts";

export default function BlogContent({ posts }: { posts: BlogPostMeta[] }) {
  const { t } = useLanguage();
  const [featured, ...rest] = posts;

  return (
    <div className="container-page pb-24 pt-28 md:pb-32 md:pt-36">
      <PageHeader title={t.blog.title} description={t.blog.description} />

      {posts.length === 0 ? (
        /* Composed empty state instead of a blank page */
        <div className="shell mt-16">
          <div className="panel flex flex-col items-center gap-4 px-8 py-20 text-center">
            <Notebook size={32} weight="light" className="text-forest-mute" />
            <p className="font-serif text-display-sm text-forest">
              Nothing here yet.
            </p>
            <p className="max-w-prose text-body-sm text-forest-soft">
              New notes get published when they are ready. Check back soon.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2">
          {/* Featured: newest post, full-width horizontal */}
          <Reveal className="md:col-span-2">
            <Link
              href={`/blog/${featured.slug}`}
              className="shell card-lift group block h-full"
            >
              <div className="panel grid h-full overflow-hidden md:grid-cols-[1.1fr_1fr]">
                {featured.coverImage && (
                  <div className="relative aspect-[512/279] w-full overflow-hidden bg-clay-soft md:aspect-auto md:h-full md:min-h-[320px]">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      width={512}
                      height={279}
                      priority
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="h-full w-full object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-4 p-6 md:p-10">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-caption uppercase tracking-[0.14em] text-forest-mute">
                      {formatDate(featured.date)}
                    </span>
                    {featured.isNew && (
                      <span className="inline-flex items-center rounded-full border border-terracotta/30 bg-terracotta-soft px-3 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-terracotta-deep">
                        {t.blog.newLabel}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-display-sm text-forest md:text-display-md">
                    {featured.title}
                  </h2>
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

          {/* The rest, in pairs */}
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 2) * 90} className="h-full">
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
                    <span className="font-mono text-caption uppercase tracking-[0.14em] text-forest-mute">
                      {formatDate(post.date)}
                    </span>
                    <h2 className="font-serif text-display-sm text-forest">
                      {post.title}
                    </h2>
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
      )}
    </div>
  );
}
