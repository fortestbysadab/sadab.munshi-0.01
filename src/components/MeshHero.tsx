import { ReactNode } from "react";

/**
 * Botanical hero band.
 *
 * NOTE: filename kept as MeshHero for API stability. Calm botanical
 * backdrop with diffused sage/clay light spots and the meandering vine.
 * Top padding is capped so hero content never floats mid-viewport;
 * clears the fixed island nav (top-4 + ~64px pill).
 */
export default function MeshHero({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-alabaster">
      {/* Diffused light spots (decorative neutrals only, accent stays locked) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[460px] w-[460px] rounded-full bg-sage/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 -z-10 h-[400px] w-[400px] rounded-full bg-clay/40 blur-3xl"
      />

      {/* Meandering vine line */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 w-full text-sage/30"
        viewBox="0 0 1400 160"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C 200,40 350,160 560,100 S 950,20 1150,110 1400,80 1400,80"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      <div className="container-page pb-20 pt-28 md:pb-28 md:pt-32">{children}</div>
    </section>
  );
}
