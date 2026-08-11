"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { navItems, site } from "@/lib/site";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const NAV_LABEL_KEYS: Record<string, keyof ReturnType<typeof useLanguage>["t"]["nav"]> = {
  "/": "home",
  "/about": "about",
  "/blog": "blog",
  "/projects": "projects",
  "/contact": "contact",
};

/**
 * Fluid island navigation — a floating glass pill detached from the top,
 * with a morphing hamburger and a full-screen staggered-reveal menu.
 * z-40 per the documented z scale; the menu overlay is z-50.
 */
export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-40 px-4 md:top-5">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-fit max-w-full items-center gap-2 rounded-full border border-forest/[0.08] bg-paper/85 p-2 shadow-medium backdrop-blur-xl"
        >
          <span className="flex items-center gap-2.5 pl-1.5">
            <Logo />
            <span className="hidden font-serif text-[17px] font-semibold tracking-[-0.01em] text-forest sm:inline">
              {site.name}
            </span>
          </span>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              const labelKey = NAV_LABEL_KEYS[item.href];
              const label = labelKey ? t.nav[labelKey] : item.label;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                      active
                        ? "bg-forest/[0.07] text-forest"
                        : "text-forest-soft hover:bg-forest/[0.045] hover:text-forest"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA cluster */}
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <Link
              href={site.resumeFile}
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-forest-soft transition-colors duration-300 hover:text-forest xl:inline-flex"
            >
              {t.nav.resume}
            </Link>
            <Link href="/contact" className="btn-primary-sm">
              {t.nav.getInTouch}
              <span className="btn-ico-sm" aria-hidden>
                <ArrowUpRight size={14} weight="bold" />
              </span>
            </Link>
          </div>

          {/* Mobile hamburger — two lines that morph into an X */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-10 w-10 place-items-center rounded-full bg-forest text-alabaster transition-transform duration-300 ease-spring active:scale-95 lg:hidden"
          >
            <span
              aria-hidden
              className={`absolute h-[1.5px] w-4 bg-current transition-all duration-300 ease-spring ${
                open ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]"
              }`}
            />
            <span
              aria-hidden
              className={`absolute h-[1.5px] w-4 bg-current transition-all duration-300 ease-spring ${
                open ? "translate-y-0 -rotate-45" : "translate-y-[3.5px]"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay — sibling of <header>, not nested inside it
          (a backdrop-blur/sticky ancestor can become a containing block for
          position:fixed and clip the overlay). Staggered mask reveal per item. */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-alabaster/90 backdrop-blur-2xl lg:hidden">
          <ul className="container-page flex flex-1 flex-col justify-center gap-1 pb-16 pt-32">
            {navItems.map((item, i) => {
              const active = isActive(pathname, item.href);
              const labelKey = NAV_LABEL_KEYS[item.href];
              const label = labelKey ? t.nav[labelKey] : item.label;
              return (
                <li
                  key={item.href}
                  className="border-b border-stone/70 motion-safe:animate-menu-item"
                  style={{ animationDelay: `${90 + i * 70}ms` }}
                >
                  <Link
                    href={item.href}
                    className={`block py-4 font-serif text-4xl tracking-[-0.02em] transition-colors duration-300 ${
                      active ? "italic text-terracotta-deep" : "text-forest hover:text-terracotta"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li
              className="mt-8 flex gap-3 motion-safe:animate-menu-item"
              style={{ animationDelay: `${90 + navItems.length * 70}ms` }}
            >
              <Link href={site.resumeFile} className="btn-ghost flex-1 px-3">
                {t.nav.resume}
              </Link>
              <Link href="/contact" className="btn-primary flex-1 pl-3">
                {t.nav.getInTouch}
                <span className="btn-ico" aria-hidden>
                  <ArrowUpRight size={16} weight="bold" />
                </span>
              </Link>
            </li>
            <li
              className="mt-8 flex justify-center motion-safe:animate-menu-item"
              style={{ animationDelay: `${140 + navItems.length * 70}ms` }}
            >
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
