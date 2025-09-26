import clsx from "clsx";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ImgHTMLAttributes } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        alt={props.alt ?? ""}
        className={clsx("rounded-md", props.className)}
      />
    ),
    Image: (props: React.ComponentProps<typeof Image>) => (
      <Image
        {...props}
        alt={props.alt ?? ""}
        className={clsx("rounded-md", props.className)}
      />
    ),
    ...components,
  };
}
