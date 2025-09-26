import MDXContent from "@/components/MDXContent";
import { allPages } from "contentlayer/generated";

export const metadata = { title: "Books" };

export default function BooksPage() {
  const page = allPages.find((p) => p.slug === "books");
  if (!page) return null;
  return (
    <article className="prose prose-zinc dark:prose-invert">
      <h1>{page.title}</h1>
      <MDXContent code={page.body.code} />
    </article>
  );
}
