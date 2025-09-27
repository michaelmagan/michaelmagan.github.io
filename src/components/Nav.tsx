"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { allPages } from "contentlayer/generated";
import Link from "next/link";
import { useMemo } from "react";

export default function Nav() {
  const { rootPages, subfolders } = useMemo(() => {
    const pages = allPages
      .filter((p) => p.slug !== "home")
      .sort((a, b) => a.slug.localeCompare(b.slug));

    const groups = pages.reduce<Record<string, typeof pages>>((acc, page) => {
      const [first, ...rest] = page.slug.split("/");
      const key = rest.length === 0 ? "__root__" : first;
      (acc[key] = acc[key] || []).push(page);
      return acc;
    }, {});

    const root = (groups["__root__"] || []).sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    const folders = Object.entries(groups)
      .filter(([k]) => k !== "__root__")
      .sort(([a], [b]) => a.localeCompare(b));

    return { rootPages: root, subfolders: folders };
  }, []);

  return (
    <nav className="text-sm text-zinc-500 flex items-center gap-3">
      <Link
        className="hover:text-zinc-900 dark:hover:text-zinc-100"
        href="/thoughts"
      >
        Thoughts
      </Link>
      {rootPages.map((p) => (
        <Link
          key={p._id}
          className="hover:text-zinc-900 dark:hover:text-zinc-100"
          href={p.url}
        >
          {p.title}
        </Link>
      ))}

      {subfolders.map(([folder, pages]) => (
        <DropdownMenu.Root key={folder}>
          <DropdownMenu.Trigger asChild>
            <button className="inline-flex items-center gap-1 bg-transparent p-0 border-0 hover:text-zinc-900 dark:hover:text-zinc-100">
              <span>{folder}</span>
              <span aria-hidden>▾</span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              collisionPadding={8}
              className="z-50 min-w-40 rounded-md border border-zinc-200 bg-white py-1 shadow-md focus:outline-none dark:border-zinc-800 dark:bg-zinc-900"
            >
              {pages
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((p) => (
                  <DropdownMenu.Item
                    key={p._id}
                    asChild
                    className="w-full text-left rounded-sm px-3 py-2 text-sm text-zinc-700 outline-none select-none cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100 data-[highlighted]:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus:bg-zinc-800 dark:data-[highlighted]:bg-zinc-800"
                  >
                    <Link className="block w-full" href={p.url}>
                      {p.title}
                    </Link>
                  </DropdownMenu.Item>
                ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ))}
    </nav>
  );
}
