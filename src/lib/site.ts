/**
 * Site-wide configuration.
 * Single source of truth for site metadata, nav, and social links.
 */

export const site = {
  name: "Sadab Munshi",
  tagline: "Personal Website",
  description:
    "Personal space of Sadab Munshi. Exploring ideas, building useful things, and sharing what I learn along the way.",
  url: "https://www.sadabmunshi.me",
  author: "Sadab Munshi",
  email: "contact@sadabmunshi.online",
  resumeFile: "/resume/Sadab-Munshi-Resume.pdf",
  twitterHandle: "@SadabMunshi",
  social: {
    twitter: "https://twitter.com/SadabMunshi",
    github: "https://github.com/sa-munshi",
    linkedin: "https://linkedin.com/in/sadab-munshi",
    instagram: "https://instagram.com/heysadab",
  },
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerNav = [
  {
    label: "Site",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
    ],
  },
  {
    label: "Writing",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/watching", label: "Watching" },
    ],
  },
  {
    label: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: site.social.github, label: "GitHub", external: true },
      { href: site.social.twitter, label: "Twitter", external: true },
      { href: site.social.linkedin, label: "LinkedIn", external: true },
    ],
  },
] as const;
