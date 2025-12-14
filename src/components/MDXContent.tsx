"use client";
import { useMDXComponents } from "@/lib/mdx-components";
import { useMDXComponent } from "next-contentlayer2/hooks";

export default function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={useMDXComponents({})} />;
}
