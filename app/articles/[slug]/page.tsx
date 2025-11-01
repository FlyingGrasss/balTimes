// app/articles/[slug]/page.tsx
import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

const ARTICLE_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  body,
  image,
  publishedAt,
  excerpt
}`

// Updated PortableText components with more comprehensive style handling
const portableTextComponents = {
  block: {
    // Handle all possible heading styles
    h1: ({ children }: any) => (
      <h1 className="text-5xl font-bold mt-12 mb-6 text-gray-900 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl font-bold mt-12 mb-6 text-gray-900 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl font-bold mt-10 mb-5 text-gray-900 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl font-bold mt-8 mb-4 text-gray-900 leading-tight">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-xl font-bold mt-6 mb-3 text-gray-900 leading-tight">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-lg font-bold mt-4 mb-2 text-gray-900 leading-tight">
        {children}
      </h6>
    ),
    // Handle normal paragraph
    normal: ({ children }: any) => (
      <p className="mb-6 text-lg leading-8 text-gray-800">
        {children}
      </p>
    ),
    // Handle other possible block styles
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-8 py-4 my-8 italic text-xl text-gray-700 bg-gray-50">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-blue-600 font-semibold underline hover:text-blue-800 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-8 space-y-3 text-lg text-gray-800 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-8 space-y-3 text-lg text-gray-800 ml-4">
        {children}
      </ol>
    ),
  },
  // Handle other possible list item styles
  listItem: {
    bullet: ({ children }: any) => (
      <li className="mb-2">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="mb-2">{children}</li>
    ),
  },
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await client.fetch(ARTICLE_QUERY, { slug })

  if (!article)
    return (
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold mb-6">
          Makale bulunamadı
        </h1>
        <Link
          href="/"
          className="text-blue-600 hover:underline font-semibold"
        >
          Ana sayfaya dön
        </Link>
      </div>
    )

  return (
    <main className="max-w-4xl mx-auto px-6 pt-12 pb-20">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:underline mb-10 font-semibold text-sm"
      >
        ← Geri Dön
      </Link>

      <article>
        <header className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>
          <time className="text-sm text-gray-600">
            {new Date(article.publishedAt).toLocaleDateString(
              'tr-TR',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
          </time>
        </header>

        {article.image && (
          <div className="my-10">
            <img
              src={urlFor(article.image).width(1200).url()}
              alt={article.title}
              className="w-full max-h-[500px] object-cover rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <PortableText
            value={article.body}
            components={portableTextComponents}
          />
        </div>
      </article>
    </main>
  )
}