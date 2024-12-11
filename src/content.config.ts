import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const articles = defineCollection({
  loader: file("src/data/out.json"),
  schema: z.object({
    date: z.string().transform((val) => new Date(val)),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    ogimage: z.string(),
    body: z.string(),
    aspectRatio: z.number(),
  }),
});

export const collections = { articles };
