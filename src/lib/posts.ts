/**
 * File-based blog system.
 *
 * Posts live as `.mdx` files in `content/blog/`, each with YAML frontmatter:
 *
 *   ---
 *   title: "..."
 *   date: "2026-03-22"
 *   modified: "2026-03-22"
 *   readingTime: "6 min read"
 *   excerpt: "..."
 *   description: "SEO meta description"
 *   coverImage: "/images/blog/the-metric-trap.webp"
 *   published: true
 *   ---
 *
 *   Markdown / MDX body here...
 *
 * To publish a new post: drop a `.mdx` file in `content/blog/`, add its cover
 * WebP to `public/images/blog/`, and push. No code changes required.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Metadata for a post (no body) — used in listings. */
export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  modified: string;
  readingTime: string;
  excerpt: string;
  description: string;
  coverImage: string;
  published: boolean;
  /** True only for the single newest published post. */
  isNew: boolean;
};

/** A full post including its raw MDX body. */
export type BlogPost = BlogPostMeta & {
  /** Raw MDX/Markdown source, ready for next-mdx-remote. */
  content: string;
};

function readRawPosts(): Array<{ data: Record<string, unknown>; content: string; slug: string }> {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { data, content, slug };
    });
}

function toMeta(
  data: Record<string, unknown>,
  slug: string
): Omit<BlogPostMeta, "isNew"> {
  const date = String(data.date ?? "");
  return {
    slug,
    title: String(data.title ?? "Untitled"),
    date,
    modified: String(data.modified ?? date),
    readingTime: String(data.readingTime ?? ""),
    excerpt: String(data.excerpt ?? ""),
    description: String(data.description ?? data.excerpt ?? ""),
    coverImage: String(data.coverImage ?? ""),
    published: data.published !== false, // default to true if omitted
  };
}

/**
 * All published posts, sorted by date descending.
 * The single newest post gets `isNew: true`.
 */
export function getAllPosts(): BlogPostMeta[] {
  const metas = readRawPosts()
    .map(({ data, slug }) => toMeta(data, slug))
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date));

  return metas.map((p, i) => ({ ...p, isNew: i === 0 }));
}

/**
 * A single published post with its MDX content, or undefined if not found
 * (or unpublished).
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  const file = readRawPosts().find((p) => p.slug === slug);
  if (!file) return undefined;

  const meta = toMeta(file.data, slug);
  if (!meta.published) return undefined;

  const all = getAllPosts();
  const isNew = all.length > 0 && all[0].slug === slug;

  return { ...meta, isNew, content: file.content };
}
