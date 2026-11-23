import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

const description =
  "Projects Sadab Munshi has built to learn, solve a problem, and explore ideas through technology.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    title: "Projects by Sadab Munshi",
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
    title: "Projects by Sadab Munshi",
    description,
    images: ["/assets/images/og-image.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
