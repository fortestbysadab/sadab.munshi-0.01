"use client";

import { useState, type KeyboardEvent } from "react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

type Project = {
  name: string;
  description: string;
  tags: string[];
  href?: string;
  muted?: boolean;
};

type StatusKind = "live" | "progress" | "tbd";

function getStatus(project: Project): StatusKind {
  if (project.href) return "live";
  if (project.muted || project.tags.some((t) => t.toUpperCase() === "TBD")) {
    return "tbd";
  }
  return "progress";
}

/**
 * "Editorial Dossier" project card, rebuilt on the double-bezel system.
 * Restrained at rest; reveals description, tech tags and a prompt on
 * hover (desktop) or tap/keyboard (all devices). Full text always stays in
 * the DOM for screen readers.
 */
function ProjectCard({
  project,
  index,
  statusLabels,
  liveLabel,
  viewDetailsLabel,
}: {
  project: Project;
  index: number;
  statusLabels: Record<StatusKind, string>;
  liveLabel: string;
  viewDetailsLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const status = getStatus(project);
  const isLink = Boolean(project.href);

  const bracketColor: Record<StatusKind, string> = {
    live: "text-terracotta-deep",
    progress: "text-forest-mute",
    tbd: "text-forest-mute",
  };

  const bodyId = `project-desc-${index}`;

  const commonClass =
    `group block h-full text-left focus-visible:outline-none ` +
    `${project.muted ? "opacity-80" : ""}`;

  const Body = (
    <div
      className={
        `shell card-lift h-full transition-colors duration-500 ` +
        `${!isLink ? "border border-dashed border-stone bg-transparent ring-0" : ""}`
      }
    >
      <div className="panel relative flex h-full flex-col gap-4 overflow-hidden p-6 md:p-8">
        {/* Ghosted index number */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-1 -top-4 select-none font-serif text-8xl leading-none text-forest/[0.05]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Bracket status tag — real mono now */}
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.14em] ${bracketColor[status]}`}
        >
          [{statusLabels[status]}]
        </span>

        <h2 className="font-serif text-display-sm text-forest md:text-display-md">
          {project.name}
        </h2>

        {/* Description — clamped at rest, expands smoothly. Full text stays
            in the DOM (line-clamp keeps it in the a11y tree). */}
        <p
          id={bodyId}
          className={`text-body-md text-forest-soft transition-all duration-500 ease-out ${
            expanded
              ? "line-clamp-none"
              : "line-clamp-1 group-hover:line-clamp-none"
          }`}
        >
          {project.description}
        </p>

        {/* Hidden tech tags — slide-up + fade-in on hover/tap */}
        <div
          className={`grid transition-all duration-500 ease-out ${
            expanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`flex flex-wrap gap-2 pt-1 transition-transform duration-500 ease-out ${
                expanded
                  ? "translate-y-0"
                  : "translate-y-1 group-hover:translate-y-0"
              }`}
            >
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Reveal prompt — labels carry their own arrow glyph */}
        <span
          className={`mt-auto inline-flex items-center gap-2 pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-forest-mute transition-all duration-500 ease-out group-hover:text-terracotta ${
            expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {isLink ? liveLabel : viewDetailsLabel}
        </span>
      </div>
    </div>
  );

  // Links open in a new tab; still support keyboard reveal via focus/hover.
  if (isLink) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.name}`}
        aria-describedby={bodyId}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        className={commonClass}
      >
        {Body}
      </a>
    );
  }

  // Non-link cards: toggle expand via tap / Enter / Space (button semantics).
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setExpanded((v) => !v);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-describedby={bodyId}
      onClick={() => setExpanded((v) => !v)}
      onKeyDown={onKey}
      className={`cursor-pointer ${commonClass}`}
    >
      {Body}
    </div>
  );
}

export default function ProjectsContent() {
  const { t } = useLanguage();

  // Derive bracket labels from existing copy (no data changes).
  const statusLabels: Record<StatusKind, string> = {
    live: "LIVE",
    progress: t.projects.inProgress.toUpperCase(),
    tbd: "TBD",
  };

  return (
    <div className="container-page pb-24 pt-28 md:pb-32 md:pt-36">
      <PageHeader title={t.projects.title} description={t.projects.description} />

      <div className="mt-12 grid items-start gap-6 md:mt-16 md:grid-cols-2">
        {t.projects.projects.map((project, i) => (
          <Reveal key={project.name} delay={i * 80} className="h-full">
            <ProjectCard
              project={project}
              index={i}
              statusLabels={statusLabels}
              liveLabel={t.projects.liveLabel}
              viewDetailsLabel="View details"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
