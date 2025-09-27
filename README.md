## Personal Site (Next.js + Contentlayer + MDX)

A content-driven personal site built with Next.js App Router, Contentlayer, MDX, and Tailwind CSS.

### Quick start

```bash
npm install
npm run dev
```

Visit http://localhost:3000

### Scripts

- **dev**: start dev server
- **build**: production build
- **start**: run built app
- **lint**: run ESLint
- **typecheck**: TypeScript project check

## Project structure

```
content/
  pages/              # MDX content pages (e.g. home, books)
  posts/              # MDX blog posts ("Thoughts")
src/
  app/                # App Router routes
    [...page]/        # Renders Contentlayer Page docs (except home)
    thoughts/[slug]/  # Renders Contentlayer Post docs
  components/         # UI components
  lib/                # MDX component mappings
```

## Content authoring

This site uses Contentlayer to source MDX from the `content/` directory. Changes are picked up automatically in dev.

### Posts — `content/posts/**/*.mdx`

Frontmatter fields (required unless noted):

- **title**
- **summary**
- **date**: ISO date (e.g. 2025-09-01)
- **image**: path to a public image (e.g. `/some-image.jpg`)
- **imageAlt**
- **tags**: optional list of strings

Example:

```mdx
---
title: "Post title"
summary: "Short summary for cards/SEO"
date: "2025-09-01"
image: "/michael-magan-li.jpeg"
imageAlt: "Michael Magan in Li"
tags: [personal, notes]
---

Your MDX content here.
```

Routing: each post is available at `/thoughts/{slug}` where `slug` comes from the file path under `content/posts/` (without the `posts/` prefix or `.mdx`). Reading time is computed automatically.

Open Graph/Twitter cards use `title`, `summary`, and `image`/`imageAlt`.

### Pages — `content/pages/**/*.mdx`

Frontmatter:

- **title**
- **description**: optional

Example:

```mdx
---
title: "Books"
description: "Books I’m reading and recommendations"
---

Page body in MDX.
```

Routing: page URLs mirror the file path under `content/pages/`. The special file `home.mdx` renders the homepage at `/` and is excluded from the catch‑all route.

## MDX rendering

- `img` and `Image` components are mapped to include rounded styles by default via `src/lib/mdx-components.tsx` and used in `src/components/MDXContent.tsx`.
- Headings get slugs and anchor links via `rehype-slug` and `rehype-autolink-headings`.
- Note: `remark-gfm` is intentionally disabled due to a known mdast table bug in this setup.

## SEO & platform

- Dynamic metadata per post/page is generated from frontmatter.
- `src/app/sitemap.ts` and `src/app/robots.ts` are provided.

## Deployment

Deploy to Vercel. Typical flow:

```bash
npm run build
```

Push to the default branch connected to Vercel. Environment does not require special variables for content.
