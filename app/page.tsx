import Image from 'next/image'
import Link from 'next/link'
import Meta from '../components/meta'
import data from '../data/out.json'
import { printPath, relativisePath } from '../helpers/paths'

type PostListItem = {
  path: string
  date: string
  title: string
  image: string
  width: number
}

const Page = () => {
  const posts = data.map((item: any) => ({
    path: `blog/${printPath(item.slug, item.date)}`,
    title: item.title,
    image: item.ogimage,
    date: item.date,
    width: 12 * item.aspectRatio || 12,
  }))

  posts.sort((a: PostListItem, b: PostListItem) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <>
      <Meta
        title="The Hoar"
        description="Satire, freshly squeezed from Warwick Uni"
        type="article"
        date={posts[0].date}
      />

      <ul className="flex flex-col gap-4">
        {posts.map((item: any) => {
          const littleImage = () => {
            if (!item.image) return item.title
            const title = item.title.split(' ')
            const lastWord = title.pop()
            const firstWords = title.join(' ')
            return (
              <>
                {firstWords}{' '}
                <span className="inline-block">
                  {lastWord}
                  <span className="ml-1.5 inline-flex overflow-hidden rounded-sm border">
                    <Image
                      height={12}
                      width={item.width}
                      src={relativisePath(item.image)}
                      alt={item.title}
                      className="h-[12px] w-auto"
                    />
                  </span>
                </span>
              </>
            )
          }
          return (
            <li key={item.path}>
              <Link href={item.path} className="block hover:opacity-70">
                {littleImage()}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Page
