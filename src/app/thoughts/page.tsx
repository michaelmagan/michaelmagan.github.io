import { allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

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
      <h1 className="text-xl tracking-tight">Thoughts</h1>
      <ul className="divide-y">
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={post.url} className="flex items-start gap-4 py-4 group">
              <div className="relative w-32 sm:w-40 md:w-48 aspect-[16/9] rounded-md overflow-hidden flex-none">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg group-hover:underline">{post.title}</h2>
                <p className="mt-1 line-clamp-2 text-zinc-600 dark:text-zinc-400">
                  {post.summary}
                </p>
                <p className="mt-2 text-sm text-[var(--link)] group-hover:text-[var(--link-hover)]">
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
