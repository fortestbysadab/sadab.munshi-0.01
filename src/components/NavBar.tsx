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
 * Full-width glass header bar (edge-to-edge at every breakpoint; internal
 * padding creates the gutters, no max-width wrapper).
 *
 * Scroll behavior: slides up and hides on scroll-down, slides back on any
 * scroll-up, and is always visible near the top of the page ("near top" =
 * within 72px). Transform-only slide, so it animates on the compositor.
 */
export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { t } = useLanguage();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (y < 72) setHidden(false); // near top: always visible
      else if (y > lastY + 4) setHidden(true); // scrolling down: hide
      else if (y < lastY - 4) setHidden(false); // scrolling up: show
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-3 right-3 top-3 z-40 rounded-full border border-forest/[0.08] bg-paper/85 shadow-medium backdrop-blur-xl transition-transform duration-500 ease-spring sm:inset-x-0 sm:top-0 sm:rounded-none sm:border-x-0 sm:border-t-0 sm:shadow-soft ${
          hidden && !open ? "-translate-y-[calc(100%+1rem)] sm:-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="flex h-16 w-full items-center justify-between gap-8 px-4 sm:h-[68px] sm:px-6 lg:px-10"
        >
          <span className="flex shrink-0 items-center">
            <Logo />
          </span>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              const labelKey = NAV_LABEL_KEYS[item.href];
              const label = labelKey ? t.nav[labelKey] : item.label;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
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
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <Link
              href={site.resumeFile}
              className="hidden whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium text-forest-soft transition-colors duration-300 hover:text-forest xl:inline-flex"
            >
              {t.nav.resume}
            </Link>
            <Link href="/contact" className="btn-primary-sm shrink-0">
              {t.nav.getInTouch}
              <span className="btn-ico-sm" aria-hidden>
                <ArrowUpRight size={14} weight="bold" />
              </span>
            </Link>
          </div>

          {/* Mobile hamburger — outlined control, distinct from the brand badge */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-forest/15 text-forest transition-all duration-300 ease-spring active:scale-95 lg:hidden"
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

      {/* Mobile full-screen overlay — sibling of <header>, not nested inside
          it (a backdrop-blur/sticky ancestor can become a containing block
          for position:fixed and clip the overlay). Its top bar matches the
          header's height and gutters so the close control sits exactly where
          the hamburger was. */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-alabaster/95 backdrop-blur-2xl lg:hidden">
          <div className="flex h-16 w-full shrink-0 items-center justify-between px-7 sm:h-[68px] sm:px-6">
            <span className="flex items-center">
              <Logo />
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-forest/15 text-forest transition-all duration-300 ease-spring active:scale-95"
            >
              <span aria-hidden className="absolute h-[1.5px] w-4 rotate-45 bg-current" />
              <span aria-hidden className="absolute h-[1.5px] w-4 -rotate-45 bg-current" />
            </button>
          </div>

          <ul className="container-page flex flex-1 flex-col justify-center gap-1 pb-12">
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
                    className={`block py-3.5 font-serif text-3xl tracking-[-0.02em] transition-colors duration-300 sm:py-4 sm:text-4xl ${
                      active ? "italic text-terracotta-deep" : "text-forest hover:text-terracotta"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li
              className="mt-8 flex gap-3 motion-safe:animate-menu-item md:mx-auto md:w-full md:max-w-md"
              style={{ animationDelay: `${90 + navItems.length * 70}ms` }}
            >
              <Link href={site.resumeFile} className="btn-ghost flex-1 px-3">
                {t.nav.resume}
              </Link>
              <Link href="/contact" className="btn-primary flex-1 justify-center pl-3">
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
