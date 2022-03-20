import { buildPath } from '../helpers/paths'
import Story from '../components/story'
import Head from 'next/head'
import { GetStaticPaths } from 'next'
import data from '../data/out.json'
import type StoryType from '../types/story'
import { getStoryBySlug } from '../helpers/stories'
import Header from '../components/header'
import Footer from '../components/footer'
import Meta from '../components/meta'
type Props = {
  story: StoryType
}

const Home = ({ story }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 antialiased">
      <Meta
        title={story.title}
        description={story.description}
        image={story.ogimage}
        type="article"
        date={story.date}
      />

      <main className="flex flex-col flex-1 max-w-screen-sm gap-16 px-4 mt-8 mb-16 ">
        <Header />
        <Story
          slug={story.slug}
          title={story.title}
          date={story.date}
          ogimage={story.ogimage}
          description={story.description}
          body={story.body}
          aspectRatio={story.aspectRatio}
        />
      </main>
      <Footer />
    </div>
  )
}

type Params = {
  params: {
    path: string[]
  }
}

export async function getStaticProps({ params }: Params) {
  const story = getStoryBySlug(params.path[4], data)
  return {
    props: {
      story: {
        slug: story.slug,
        title: story.title,
        date: story.date,
        ogimage: story.ogimage,
        description: story.description,
        body: story.body,
        aspectRatio: story.aspectRatio,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: data.map((item: any) => ({
      params: {
        path: buildPath(item.slug, item.date),
      },
    })),
    fallback: false,
  }
}

export default Home
