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
  const [featured, ...restPosts] = posts;

  return (
    <section className="space-y-12">
      <div className="grid items-start gap-10 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="md:row-span-2 lg:sticky lg:top-10">
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
        <h2 className="text-sm font-medium tracking-tight">Latest thoughts</h2>
        {featured ? (
          <Link
            href={featured.url}
            className="block rounded-md border overflow-hidden hover:border-zinc-300 transition-colors"
          >
            <div className="aspect-[16/9] relative">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium line-clamp-2">
                {featured.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                {featured.summary}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                {new Date(featured.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </Link>
        ) : null}

        <ul className="grid gap-4 sm:grid-cols-2">
          {restPosts.map((post) => (
            <li
              key={post._id}
              className="rounded-md border hover:border-zinc-300 transition-colors"
            >
              <Link href={post.url} className="block p-4">
                <h3 className="font-medium line-clamp-2">{post.title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {post.summary}
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
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
