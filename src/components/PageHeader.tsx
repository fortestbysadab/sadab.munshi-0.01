import { ReactNode } from "react";
import Reveal from "./Reveal";

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal>
      <header className="flex flex-col gap-5">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="headline-serif max-w-3xl text-5xl leading-[1.08] md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-prose text-body-lg text-forest-soft">
            {description}
          </p>
        )}
        {children}
      </header>
    </Reveal>
  );
}
