import MDXContent from "@/components/MDXContent";
import { allPages, allPosts } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const posts = allPosts
    .slice()
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 3);
  const home = allPages.find((p) => p.slug === "home");

  return (
    <section className="space-y-12">
      <div className="grid items-start gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="md:row-span-2 lg:top-10">
          <Image
            src="/michael-magan-li.jpeg"
            alt="Portrait of Michael Magán"
            width={280}
            height={280}
            className="rounded-xl object-cover shadow-sm w-full h-auto"
            sizes="(max-width: 768px) 140px, (max-width: 1024px) 200px, 280px"
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="prose prose-zinc dark:prose-invert">
            {home ? <MDXContent code={home.body.code} /> : null}
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-md tracking-tight">Latest thoughts</h2>
        <ul className="divide-y">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                href={post.url}
                className="flex items-start gap-4 py-4 group"
              >
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
                  <h3 className="text-lg font-medium group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {post.summary}
                  </p>
                  <p className="mt-2 text-xs text-[var(--link)] group-hover:text-[var(--link-hover)]">
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
        <div>
          <Link
            href="/thoughts"
            className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
          >
            Browse all thoughts →
          </Link>
        </div>
      </section>
    </section>
  );
}
