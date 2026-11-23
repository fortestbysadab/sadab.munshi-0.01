# Sadab Munshi — Personal Website

Personal portfolio and blog built with **Next.js App Router**, **TypeScript**,
**Tailwind CSS**, and **MDX**. It includes a file-based blog, English/Bengali/Hindi
language switching, a Resend-powered contact form, SEO metadata, and analytics.

## Tech stack

- **Next.js 14** — App Router, React Server Components, static generation
- **React 18** and **TypeScript**
- **Tailwind CSS 3** — design tokens and shared component classes
- **MDX** — `next-mdx-remote/rsc` with `gray-matter` frontmatter
- **Phosphor Icons**
- **Resend** — contact-form email delivery
- **PostHog** and **Vercel Analytics**
- **Newsreader**, **Manrope**, and **Geist Mono** fonts

## Features

- Responsive portfolio with home, about, projects, blog, watching, and contact pages
- File-based MDX blog with static post routes, cover images, reading time, and a newest-post badge
- English, Bengali, and Hindi UI with browser-language detection and a persisted language preference
- Contact form with server-side validation and Resend email delivery
- Per-page metadata, Open Graph tags, JSON-LD, `sitemap.xml`, and `robots.txt`
- Scroll-reveal animations, accessible navigation, and a mobile menu
- Optional PostHog analytics and Vercel Analytics

## Getting started

Requires **Node.js 18.17+** and npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site runs without environment variables, but the contact form will not send
email until Resend is configured and analytics will stay disabled until PostHog
is configured.

### Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start the development server   |
| `npm run build` | Create a production build      |
| `npm start`     | Run the production build       |
| `npm run lint`  | Run Next.js lint checks        |

## Environment variables

Copy `.env.example` to `.env.local` and set the values you need.

| Variable                  | Required          | Description                                                                 |
| ------------------------- | ----------------- | --------------------------------------------------------------------------- |
| `RESEND_API_KEY`          | For email sending | Resend API key. Without it, the contact endpoint returns a friendly error.  |
| `CONTACT_TO`              | No                | Inbox that receives messages. Defaults to `site.email` in `src/lib/site.ts`. |
| `CONTACT_FROM`            | For email sending | Verified sender address, e.g. `Website <noreply@example.com>`.              |
| `NEXT_PUBLIC_POSTHOG_KEY` | No                | PostHog project API key. Analytics are disabled when omitted.               |
| `NEXT_PUBLIC_POSTHOG_HOST`| No                | PostHog host. Defaults to `https://us.i.posthog.com`.                       |

For production, verify the sender domain in Resend and use an address on that
domain for `CONTACT_FROM`.

## Project structure

```text
content/
└── blog/                     # MDX blog posts
public/
├── assets/images/            # Logo, favicons, portrait, about-page artwork
├── images/blog/              # Blog cover images
├── manifest.json             # Web app manifest
└── favicon.ico
src/
├── app/
│   ├── about/                # About page and client content
│   ├── api/contact/route.ts  # Contact-form API endpoint
│   ├── blog/
│   │   ├── [slug]/page.tsx   # Individual post (statically generated)
│   │   └── page.tsx          # Blog index
│   ├── contact/              # Contact page and form
│   ├── projects/             # Projects page and cards
│   ├── watching/             # Watching list
│   ├── globals.css           # Base styles and shared component classes
│   ├── layout.tsx            # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx              # Home page
│   ├── HomeContent.tsx       # Home page client content
│   ├── not-found.tsx         # 404 page
│   ├── robots.ts             # robots.txt
│   └── sitemap.ts            # sitemap.xml
├── components/               # Navigation, footer, hero, cards, MDX renderer, etc.
├── context/
│   └── LanguageContext.tsx   # Language state and translation provider
└── lib/
    ├── posts.ts              # MDX reading, frontmatter parsing, post helpers
    ├── site.ts               # Site metadata, navigation, and social links
    ├── utils.ts              # Date helpers
    └── translations/         # English, Bengali, and Hindi copy
```

## Blog posts

Posts are MDX files in [`content/blog/`](./content/blog). The filename becomes
the URL slug.

```mdx
---
title: "My New Post"
date: "2026-06-19"
modified: "2026-06-19"
readingTime: "4 min read"
excerpt: "One-line summary shown on cards."
description: "SEO meta description."
coverImage: "/images/blog/my-new-post.webp"
published: true
---

Opening paragraph in Markdown.

## A section

More text, **bold**, *italic*, [links](https://example.com), and lists.
```

Add the cover image at `public/images/blog/my-new-post.webp` and the post will
appear automatically in the blog index, home page, sitemap, and static routes.

Notes:

- Posts are read at build time with `fs` and `gray-matter`.
- `published: false` hides a post from the site.
- The newest published post receives the **New** badge.
- The body is compiled with `next-mdx-remote/rsc`.
- Post metadata, Open Graph data, article JSON-LD, and static paths are generated
  from frontmatter in `src/app/blog/[slug]/page.tsx`.
- Cover images are animated WebP and are served with `unoptimized` so Next.js
  preserves the animation.

## Languages

UI copy lives in [`src/lib/translations/`](./src/lib/translations):

- `en.ts` — English
- `bn.ts` — Bengali
- `hi.ts` — Hindi
- `types.ts` — shared translation shape

When adding or changing copy, update all three language files so their shapes
stay identical. `LanguageContext.tsx` detects the browser language by default,
stores a manual choice in `localStorage` under `sm-lang`, and exposes the active
translations through `useLanguage()`.

## Site configuration

[`src/lib/site.ts`](./src/lib/site.ts) is the single source of truth for:

- Site name, description, author, URL, and email
- Social links
- Main navigation
- Footer navigation

Update `site.url` when deploying to a different domain so canonical URLs,
Open Graph URLs, `sitemap.xml`, and JSON-LD stay correct.

## Contact form

The contact flow is:

1. `src/app/contact/ContactForm.tsx` collects the name, email, and message.
2. It sends a `POST` request to `/api/contact`.
3. `src/app/api/contact/route.ts` validates the fields and sends the message
   through Resend.
4. The sender's address is used as `replyTo`, so replies go directly to them.

If `RESEND_API_KEY` is missing, the endpoint returns a clear error instead of
crashing. Setup instructions and the full variable reference are in
[`.env.example`](./.env.example).

## SEO and analytics

- Page metadata is defined with the Next.js Metadata API.
- The root layout adds a `Person` JSON-LD block.
- Blog posts add `Article` JSON-LD and article-specific Open Graph metadata.
- `src/app/sitemap.ts` generates `sitemap.xml` for static pages and blog posts.
- `src/app/robots.ts` allows the public site and excludes `/contact`,
  `/watching`, and `/api/`.
- Vercel Analytics is included in the root layout.
- PostHog initializes on the client when `NEXT_PUBLIC_POSTHOG_KEY` is set.

## Design system

The UI uses a **Botanical Editorial** design system:

- Warm bone canvas, deep forest ink, and a single terracotta accent
- Newsreader for editorial headlines, Manrope for body and UI text, Geist Mono
  for eyebrows, metadata, and code
- Pill-shaped interactive controls and concentric double-bezel surfaces
- Shared tokens in [`tailwind.config.ts`](./tailwind.config.ts) and
  [`src/app/globals.css`](./src/app/globals.css)
- Scroll-reveal and menu animations that respect `prefers-reduced-motion`

## Deployment

The project is ready for Vercel:

```bash
npm run build
```

Import the repository at [vercel.com/new](https://vercel.com/new), add the
environment variables above, and deploy. Set the production domain and update
`site.url` in `src/lib/site.ts` if it changes.

---

**Author:** Sadab Munshi
