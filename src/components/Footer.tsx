"use client";

import Link from "next/link";
import { ArrowUp } from "@phosphor-icons/react";
import { footerNav, site } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "./Logo";

type FooterColKey = "Site" | "Writing" | "Connect";
type NavLinkLabel =
  | "Home" | "About" | "Projects" | "Blog" | "Watching"
  | "Contact" | "GitHub" | "Twitter" | "LinkedIn";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  const colLabel = (label: string): string => {
    const map: Record<FooterColKey, string> = {
      Site: t.footer.site,
      Writing: t.footer.writing,
      Connect: t.footer.connect,
    };
    return map[label as FooterColKey] ?? label;
  };

  const linkLabel = (label: string): string => {
    const map: Record<NavLinkLabel, string> = {
      Home: t.nav.home,
      About: t.nav.about,
      Projects: t.nav.projects,
      Blog: t.nav.blog,
      Watching: t.watching.title,
      Contact: t.nav.contact,
      GitHub: "GitHub",
      Twitter: "Twitter",
      LinkedIn: "LinkedIn",
    };
    return map[label as NavLinkLabel] ?? label;
  };

  return (
    <footer className="bg-clay-soft/50">
      {/* Meandering root/vine divider (decorative neutral) */}
      <svg
        aria-hidden
        className="h-12 w-full text-sage/35"
        viewBox="0 0 1400 48"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,24 C 220,-4 380,52 620,24 S 1050,-4 1400,28"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <div className="container-page pb-16 pt-10">
        <div className="mb-14 flex items-center gap-3">
          <Logo shape="circle" />
          <span className="font-serif text-lg font-semibold tracking-[-0.01em] text-forest">
            {site.name}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          {footerNav.map((col) => (
            <div key={col.label} className="flex flex-col gap-5">
              <h3 className="eyebrow">{colLabel(col.label)}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-[15px] text-forest-soft transition-colors duration-300 hover:text-terracotta"
                    >
                      {linkLabel(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between gap-4 border-t border-stone pt-8">
          <p className="font-mono text-caption uppercase tracking-[0.14em] text-forest-mute">
            © {year} {site.name}. {t.footer.rights}
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-forest/[0.12] text-forest-soft transition-all duration-300 ease-spring hover:border-terracotta hover:text-terracotta active:scale-95"
          >
            <ArrowUp size={16} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
