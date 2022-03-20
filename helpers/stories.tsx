import StoryType from '../types/story'

export const getStoryBySlug = (querySlug: string, data: any): StoryType => {
  const story = data.find((item: any) => item.slug === querySlug)
  if (story === undefined) {
    throw new Error(`No story found for slug: ${querySlug}`)
  }
  return {
    slug: story.slug,
    date: story.date,
    title: story.title,
    description: story.description,
    body: story.body,
    ogimage: story.ogimage,
    aspectRatio: story.aspectRatio,
  }
}
