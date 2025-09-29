import MDXContent from "@/components/MDXContent";
import { allPages } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPages
    .filter((p) => p.slug !== "home")
    .map((p) => ({ page: p.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string[] }>;
}): Promise<Metadata> {
  const { page } = await params;
  const slug = page.join("/");
  const doc = allPages.find((p) => p.slug === slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: doc.url,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string[] }>;
}) {
  const { page } = await params;
  const slug = page.join("/");
  const doc = allPages.find((p) => p.slug === slug && p.slug !== "home");
  if (!doc) return notFound();
  return (
    <article className="prose prose-zinc dark:prose-invert">
      <h1 className="text-xl">{doc.title}</h1>
      <MDXContent code={doc.body.code} />
    </article>
  );
}
