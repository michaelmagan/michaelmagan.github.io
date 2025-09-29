import MDXContent from "@/components/MDXContent";
import { allPosts } from "contentlayer/generated";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return {};
  const title = post.title;
  return {
    title,
    description: post.summary,
    openGraph: {
      title,
      description: post.summary,
      images: [{ url: post.image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.summary,
      images: [post.image],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  return (
    <article className="prose prose-zinc dark:prose-invert">
      <h1 className="text-2xl tracking-tight mt-0 mb-1">{post.title}</h1>
      <p className="mt-0 text-zinc-500">{post.summary}</p>

      <div className="my-2 rounded-md overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          width={1200}
          height={630}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      <p className="mt-0 mb-6 text-sm text-zinc-500 uppercase">
        {new Date(post.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {post.readingTime?.text ? ` • ${post.readingTime.text}` : null}
      </p>
      <hr className="my-8" />
      <div className="post-body">
        <MDXContent code={post.body.code} />
      </div>
      <hr className="my-8" />
      <div>
        <Link href="/thoughts"> ← Back to thoughts</Link>
      </div>
    </article>
  );
}
