import { useRouter } from 'next/router'
import { posts } from '../../posts'

export default function BlogPost() {
  const router = useRouter()
  const slug = router.query.slug as string
  const Post = slug ? posts[slug]?.Component : null
  if (!Post) return <p>Post not found</p>
  return (
    <div className="min-h-screen p-4 bg-offwhite font-serif">
      <Post />
    </div>
  )
}
