import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Renders MDX body content with components styled to the Botanical Editorial
 * design system. Used inside the `.prose-doc` wrapper on blog post pages.
 *
 * This is a React Server Component (next-mdx-remote/rsc), so the MDX is
 * compiled at build time during static generation.
 */

const components = {
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} className="link-inline" {...props} />
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-inline"
        {...props}
      />
    );
  },
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-doc">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
