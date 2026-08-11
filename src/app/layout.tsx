import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PostHogProvider from "@/components/PostHogProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { site } from "@/lib/site";

// Heritage pairing (the original PHP site's faces), refined for the redesign.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s / ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    locale: "en_US",
    images: [{ url: "/assets/images/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitterHandle,
    creator: site.twitterHandle,
    title: site.name,
    description: site.description,
    images: ["/assets/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/assets/images/favicon.ico" },
      { url: "/assets/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/assets/images/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    sameAs: [
      site.social.github,
      site.social.linkedin,
      site.social.twitter,
      site.social.instagram,
    ],
  };

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} ${GeistMono.variable}`}
    >
      <body id="top" className="flex min-h-screen flex-col">
        {/* Paper grain texture — fixed, pointer-events-none, above all content
            (z-60 per the z scale documented in globals.css) */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <LanguageProvider>
          <PostHogProvider>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <NavBar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </PostHogProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
