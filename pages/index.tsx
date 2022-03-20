import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { printPath } from './../helpers/paths'
import data from '../data/out.json'
import Link from 'next/link'
import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'

type PostListItem = {
  path: string
  date: string
  title: string
  image: string
  width: number
}

const Home: NextPage = ({ posts }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 antialiased">
        <Meta
          description="Satire, freshly squeezed from Warwick Uni"
          type="article"
          date={posts[0].date}
        />
      <main className="flex flex-col flex-1 max-w-screen-sm gap-2 px-4 my-8">
        <Header />
        <div className="h-6" />
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
                      src={item.image}
                      alt={item.title}
                    />
                  </span>
                </span>
              </>
            )
          }
          return (
            <Link key={item.path} href="[...slug].tsx" as={item.path}>
              <a className="inline-block hover:opacity-70">{littleImage()}</a>
            </Link>
          )
        })}
      </main>

      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = data.map((item: any) => ({
    path: printPath(item.slug, item.date),
    title: item.title,
    image: item.ogimage,
    date: item.date,
    width: 12 * item.aspectRatio || 12,
  }))

  const sortedPosts: PostListItem[] = posts.sort(
    (a: PostListItem, b: PostListItem) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  )

  return {
    props: {
      posts: sortedPosts,
    },
  }
}

export default Home
