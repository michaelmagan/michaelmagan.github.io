import Link from "next/link";
import Image from "next/image";
import { allPosts } from "contentlayer/generated";

export const metadata = {
  title: "Thoughts",
  description: "Writing and notes by Michael Magan",
};

export default function ThoughtsPage() {
  const posts = allPosts
    .slice()
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Thoughts</h1>
      <ul className="grid gap-6">
        {posts.map((post) => (
          <li key={post._id} className="rounded-md border overflow-hidden">
            <Link href={post.url} className="block">
              <div className="aspect-[16/9] relative">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-medium">{post.title}</h2>
                <p className="mt-1 line-clamp-2 text-zinc-600 dark:text-zinc-400">
                  {post.summary}
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}


