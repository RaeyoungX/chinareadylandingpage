import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map img to Next.js Image with sensible defaults
    img: (props) => (
      <Image
        sizes="(max-width: 768px) 100vw, 800px"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
      />
    ),
    // Open external links in new tab
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }
      return <Link href={href ?? "#"} {...props}>{children}</Link>;
    },
    ...components,
  };
}
