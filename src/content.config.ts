import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  loader: file("src/data/out.json"),
  schema: ({ image }) =>
    z.object({
      date: z.coerce.date(),
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      ogimage: image(),
      body: z.string(),
      aspectRatio: z.number(),
    }),
});

export const collections = { articles };
