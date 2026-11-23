import type { Metadata } from "next";
import { site } from "@/lib/site";
import AboutContent from "./AboutContent";

const description =
  "Sadab Munshi is a student exploring money, systems, and technology by building small things and writing about what he learns.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: "About Sadab Munshi",
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
    title: "About Sadab Munshi",
    description,
    images: ["/assets/images/og-image.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  sameAs: [site.social.github, site.social.linkedin, site.social.twitter, site.social.instagram],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutContent />
    </>
  );
}
