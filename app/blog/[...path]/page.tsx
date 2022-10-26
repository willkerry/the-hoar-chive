import Story from '../../../components/story'
import data from '../../../data/out.json'
import type StoryType from '../../../types/story'
import { getStoryBySlug } from '../../../helpers/stories'
import { buildPath, relativisePath } from '../../../helpers/paths'

const Home = ({
  params,
}: {
  params: {
    path: string[]
  }
}) => {
  const story = getStoryBySlug(params.path[4], data)

  return (
    <Story
      slug={story.slug}
      title={story.title}
      date={story.date}
      ogimage={relativisePath(story.ogimage)}
      description={story.description}
      body={story.body}
      aspectRatio={story.aspectRatio}
    />
  )
}

export async function generateStaticParams() {
  return data.map((story: StoryType) => ({
    params: {
      path: buildPath(story.slug, story.date),
    },
  }))
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: data.map((item: any) => ({
//       params: {
//         path: buildPath(item.slug, item.date),
//       },
//     })),
//     fallback: false,
//   }
// }

export default Home
