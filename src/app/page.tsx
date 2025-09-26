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
  const contact = allPages.find((p) => p.slug === "contact");
  const [featured, ...restPosts] = posts;

  return (
    <section className="space-y-10">
      <div className="grid items-start gap-10 md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr_320px]">
        <div className="md:row-span-2 lg:sticky lg:top-10">
          <Image
            src="/michael-magan-li.jpeg"
            alt="Michael Magan"
            width={320}
            height={320}
            className="rounded-xl object-cover shadow-sm w-full h-auto"
            priority
          />
        </div>

        <div className="space-y-4">
          <div className="prose prose-zinc dark:prose-invert">
            {home ? <MDXContent code={home.body.code} /> : null}
          </div>
        </div>

        <aside className="hidden lg:block lg:border-l lg:pl-8 lg:dark:border-zinc-800">
          <div className="prose prose-zinc dark:prose-invert">
            {contact ? <MDXContent code={contact.body.code} /> : null}
          </div>
        </aside>
      </div>

      {contact ? (
        <div className="lg:hidden rounded-lg border p-4 bg-white/60 dark:bg-zinc-900/40 prose prose-zinc dark:prose-invert">
          <MDXContent code={contact.body.code} />
        </div>
      ) : null}

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
