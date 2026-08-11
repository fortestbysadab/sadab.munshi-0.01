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
        <h1 className="headline-serif max-w-3xl text-4xl leading-[1.1] md:text-6xl md:leading-[1.08]">
          {title}
        </h1>
        {description && (
          <p className="max-w-prose text-body-md text-forest-soft md:text-body-lg">
            {description}
          </p>
        )}
        {children}
      </header>
    </Reveal>
  );
}
