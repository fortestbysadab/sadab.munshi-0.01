import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import BlogContent from "./BlogContent";

const description =
  "Writing by Sadab Munshi about what he builds, what he breaks, and what he learns along the way.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog — Sadab Munshi",
    description,
    images: [
      {
        url: "/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sadab Munshi — personal portfolio and writing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Sadab Munshi",
    description,
    images: ["/assets/images/og-image.png"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return <BlogContent posts={posts} />;
}
