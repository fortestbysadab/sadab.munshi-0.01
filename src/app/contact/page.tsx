import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

const description = "Have a question or just want to say hello? Get in touch.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: "Contact Sadab Munshi",
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
    title: "Contact Sadab Munshi",
    description,
    images: ["/assets/images/og-image.png"],
  },
  // Keep this utility page out of results while allowing crawlers to follow
  // its links and honour the directive.
  robots: { index: false, follow: true },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
