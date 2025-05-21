import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-offwhite text-gray-900 font-serif">
      <h1 className="text-4xl">Michael Magán</h1>
      <nav className="space-x-4">
        <Link href="https://github.com/michaelmagan" className="underline">GitHub</Link>
        <Link href="https://www.linkedin.com/in/mnmagan/" className="underline">LinkedIn</Link>
        <Link href="https://twitter.com/mrmagan_" className="underline">Twitter</Link>
        <Link href="/blog" className="underline">Blog</Link>
      </nav>
    </div>
  )
}
