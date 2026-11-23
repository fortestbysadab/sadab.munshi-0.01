import type { Metadata } from "next";
import WatchingContent from "./WatchingContent";

const description =
  "Movies and shows Sadab Munshi has watched or is watching, with personal recommendations and a watch list.";

export const metadata: Metadata = {
  title: "Watching",
  description,
  alternates: { canonical: "/watching" },
  openGraph: {
    type: "website",
    url: "/watching",
    title: "Watching — Sadab Munshi",
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
    title: "Watching — Sadab Munshi",
    description,
    images: ["/assets/images/og-image.png"],
  },
  robots: { index: false, follow: true },
};

export default function WatchingPage() {
  return <WatchingContent />;
}
