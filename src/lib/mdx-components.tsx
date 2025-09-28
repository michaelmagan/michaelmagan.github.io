import clsx from "clsx";
// Minimal local MDXComponents type to avoid external type dep issues
type MDXComponents = Record<string, React.ComponentType<any>>;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error Next.js provides type declarations for next/image
import Image from "next/image";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error React types are provided globally via Next.js
import type { ImgHTMLAttributes } from "react";
import { Counter } from "@/components/Counter";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Counter,
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
