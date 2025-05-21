import HelloWorld, { meta as helloMeta } from './hello-world'
import SecondPost, { meta as secondMeta } from './second-post'

export const posts = {
  [helloMeta.slug]: { Component: HelloWorld, meta: helloMeta },
  [secondMeta.slug]: { Component: SecondPost, meta: secondMeta },
}

export const allPosts = Object.values(posts).map(p => ({ slug: p.meta.slug, title: p.meta.title }))
