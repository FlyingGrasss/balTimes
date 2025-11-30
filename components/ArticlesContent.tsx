// components/ArticlesContent.tsx

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  image: any
  publishedAt: string
  featured: boolean
  type?: string
  category: 'haber' | 'edebiyat'
  author?: {
    name: string
    image: any
  }
}

interface ArticlesContentProps {
  articles: Article[]
}

export default function ArticlesContent({
  articles,
}: ArticlesContentProps) {
  const [currentCategory, setCurrentCategory] = useState<
    'haber' | 'edebiyat'
  >('haber')

  const categoryArticles = articles.filter(
    (a) => a.category === currentCategory
  )

  const featured = categoryArticles.find((a) => a.featured)
  const recent = categoryArticles.filter((a) => !a.featured)

  const categories: Array<'haber' | 'edebiyat'> = [
    'haber',
    'edebiyat',
  ]

  return (
    <>
      {/* Category Tabs */}
      <div className="flex gap-8 mb-8 border-b border-black pb-4 max-sm:gap-4 max-sm:mb-6 max-sm:pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCurrentCategory(cat)}
            className={`text-lg max-sm:text-sm font-semibold capitalize
              cursor-pointer transition ${
              currentCategory === cat
                ? 'text-black border-b-2 border-black -mb-4 pb-4 max-sm:border-b max-sm:-mb-2 max-sm:pb-2'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content Area (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="">
            {/* Featured Article */}
            {featured && (
              <section>
                <Link
                  href={`/articles/${featured.slug.current}`}
                  className="block group"
                >
                  <div className="pb-8 max-sm:pb-4 border-b border-black">
                    <div className="flex max-sm:flex-col gap-4">
                      <div className="flex max-w-[300px]
                        max-sm:max-w-full flex-col">
                        {featured.type && (
                          <span className="w-fit text-xs text-gray-800
                            font-semibold mb-2">
                            {featured.type}
                          </span>
                        )}
                        <h2 className="text-2xl font-bold leading-tight
                          mb-4 text-gray-900 group-hover:text-gray-500
                          transition">
                          {featured.title}
                        </h2>

                        <p className="text-gray-600 tracking-tight text-sm
                          mb-4">
                          {featured.excerpt}
                        </p>
                        <time className="text-xs text-gray-500">
                          {new Date(
                            featured.publishedAt
                          ).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        {featured.author && (
                          <p className="text-sm text-gray-800 mt-2">
                            {featured.author.name}
                          </p>
                        )}
                      </div>
                      {featured.image && (
                        <div className="overflow-hidden">
                          <div className="relative w-full">
                            <Image
                              src={`${urlFor(featured.image)}`}
                              width={700}
                              height={400}
                              alt=""
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* Recent Articles */}
            {recent.length > 0 && (
              <section>
                {recent.map((article, index) => (
                  <Link
                    href={`/articles/${article.slug.current}`}
                    className="block group"
                    key={article._id}
                  >
                    <div className={`pb-8 max-sm:pb-4 border-b
                      border-black ${
                      index === 0 && !featured
                        ? 'pt-0 max-sm:pt-0'
                        : 'pt-8 max-sm:pt-4'
                    }`}>
                      <div className="flex max-sm:flex-col gap-4">
                        <div className="flex max-w-[300px]
                          max-sm:max-w-full flex-col">
                          {article.type && (
                            <span className="w-fit text-xs text-gray-800
                              font-semibold mb-2">
                              {article.type}
                            </span>
                          )}
                          <h2 className="text-2xl font-bold leading-tight
                            mb-4 text-gray-900 group-hover:text-gray-500
                            transition">
                            {article.title}
                          </h2>

                          <p className="text-gray-600 tracking-tight
                            text-sm mb-4">
                            {article.excerpt}
                          </p>
                          <time className="text-xs text-gray-500">
                            {new Date(
                              article.publishedAt
                            ).toLocaleDateString('tr-TR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                          {article.author && (
                            <p className="text-sm text-gray-800
                              font-bold mt-2">
                              {article.author.name}
                            </p>
                          )}
                        </div>
                        {article.image && (
                          <div className="overflow-hidden">
                            <div className="relative w-full">
                              <Image
                                src={`${urlFor(article.image)}`}
                                width={700}
                                height={400}
                                alt=""
                                className="w-full h-auto"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </section>
            )}
          </div>
        </div>

        {/* Sidebar Area (1/3 width) - Empty for now */}
        <div className="lg:col-span-1 max-sm:hidden">
          <div className="top-24 border-l min-h-screen
            border-gray-300 pl-8">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b
              border-gray-300">
              Sidebar
            </h2>
            <p className="text-gray-500 text-sm">
              This section is reserved for future content.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}