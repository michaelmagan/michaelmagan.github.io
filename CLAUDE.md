# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A personal site built with Next.js 15 (App Router), Contentlayer for MDX content sourcing, and Tailwind CSS 4. The site features blog posts ("Thoughts") and static pages, all authored in MDX.

## Development Commands

```bash
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build
npm run start      # Run production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check (no emit)
```

Pre-commit hook runs `lint` and `typecheck` automatically via Husky.

## Architecture

### Content Layer

Contentlayer (`contentlayer.config.ts`) defines two document types:

- **Post**: Maps to `content/posts/**/*.mdx`, rendered at `/thoughts/{slug}`
  - Slug computed by stripping `posts/` prefix from file path
  - Reading time computed automatically from body
  - Required frontmatter: `title`, `summary`, `date`, `image`, `imageAlt`
  - Optional: `tags` array

- **Page**: Maps to `content/pages/**/*.mdx`, rendered at `/{slug}`
  - `home.mdx` is special-cased to render at `/` (excluded from catch-all route)
  - Required frontmatter: `title`
  - Optional: `description`

Rehype plugins (`rehype-slug`, `rehype-autolink-headings`) add heading anchors. `remark-gfm` is disabled due to a known mdast table bug.

### Routing

- `/` (homepage): `src/app/page.tsx` — renders `home.mdx` content + latest 3 posts
- `/thoughts`: `src/app/thoughts/page.tsx` — lists all posts sorted by date
- `/thoughts/[slug]`: `src/app/thoughts/[slug]/page.tsx` — renders individual post
- `/[...page]`: `src/app/[...page]/page.tsx` — catch-all for other Page docs (excludes `home`)

All routes use `dynamicParams = false` and `generateStaticParams` for static export.

### MDX Rendering

- `src/lib/mdx-components.tsx`: Defines custom component mappings (rounded `img`/`Image`)
- `src/components/MDXContent.tsx`: Client component that applies mappings to Contentlayer's compiled MDX

### Metadata & SEO

- Root layout (`src/app/layout.tsx`) sets base metadata, Open Graph, and Twitter cards
- Individual post/page routes override metadata via `generateMetadata`
- `src/app/sitemap.ts` and `src/app/robots.ts` provide sitemap/robots for crawlers

### Styling

- Tailwind CSS 4 with `@tailwindcss/typography` for prose styles
- Custom fonts: Geist (sans), Geist Mono, Fraunces (headings)
- Dark mode supported via Tailwind's `dark:` variants

## Content Workflow

1. Add/edit MDX files in `content/posts/` or `content/pages/`
2. Contentlayer watches in dev and regenerates on changes
3. Access via imported types from `contentlayer/generated`
