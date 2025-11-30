// app/(main)/page.tsx

import ArticlesContent from '@/components/ArticlesContent'
import { client } from '@/lib/sanity'

const ARTICLE_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  image,
  publishedAt,
  featured,
  type,
  category,
  author-> {
    name,
    image
  }
}`

export default async function Home() {
  const articles = await client.fetch(ARTICLE_QUERY, {}, {
    next: { tags: ['articles'] }
  })

  return (
    <main className="mx-20 max-sm:mx-4 pt-8 max-sm:pt-6 pb-20">
      <ArticlesContent articles={articles} />
    </main>
  )
}