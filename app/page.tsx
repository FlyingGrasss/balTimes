// app/page.tsx
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

const ARTICLE_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  image,
  publishedAt,
  featured
}`

export default async function Home() {
  const articles = await client.fetch(ARTICLE_QUERY)

  const featured = articles.find((a: any) => a.featured)
  const recent = articles
    .filter((a: any) => !a.featured)
    .slice(0, 6)

  return (
    <main className="mx-20 max-sm:mx-4 pt-8 pb-20">
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
                      <div className="flex max-w-[300px] max-sm:max-w-full flex-col">
                        <h2 className="text-2xl font-bold leading-tight mb-4 text-gray-900 group-hover:text-gray-500  transition">
                          {featured.title}
                        </h2>
                        <p className="text-gray-600 tracking-tight text-sm mb-4">
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
                      </div>
                      {featured.image && (
                        <div className="overflow-hidden">
                          <div className="relative w-full">
                            <Image
                              src={`${urlFor(featured.image)}`}
                              width={700}
                              height={400}
                              alt=''
                              className='w-full h-auto'
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
                {recent.map((article: any, index: number) => (
                  <Link
                  href={`/articles/${article.slug.current}`}
                  className="block group"
                  key={index}
                >
                  <div className="pb-8 pt-8 max-sm:pt-4 max-sm:pb-4 border-b border-black">
                    <div className="flex max-sm:flex-col gap-4">
                      <div className="flex max-w-[300px] max-sm:max-w-full flex-col">
                        <h2 className="text-2xl font-bold leading-tight mb-4 text-gray-900 group-hover:text-gray-500  transition">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 tracking-tight text-sm mb-4">
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
                      </div>
                      {article.image && (
                        <div className="overflow-hidden">
                          <div className="relative w-full">
                            <Image
                              src={`${urlFor(article.image)}`}
                              width={700}
                              height={400}
                              alt=''
                              className='w-full h-auto'
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
        <div className="lg:col-span-1 max-sm:hidden ">
          <div className="top-24 border-l min-h-screen border-gray-300 pl-8">
            <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-300">
              Sidebar
            </h2>
            <p className="text-gray-500 text-sm">
              This section is reserved for future content.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}