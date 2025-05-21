import Link from 'next/link'
import { allPosts } from '../../posts'

export default function BlogIndex() {
  return (
    <div className="min-h-screen p-4 bg-offwhite font-serif">
      <h1 className="text-3xl mb-4">Blog</h1>
      <ul className="space-y-2">
        {allPosts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
