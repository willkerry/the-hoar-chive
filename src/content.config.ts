import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { string as sq } from "smartquotes-ts";

const articles = defineCollection({
  loader: file("src/data/out.json"),
  schema: ({ image }) =>
    z.object({
      date: z.coerce.date(),
      slug: z.string(),
      title: z.string().transform((s) => sq(s)),
      description: z.string().transform((s) => sq(s)),
      ogimage: image(),
      body: z.string(),
      aspectRatio: z.number(),
    }),
});

export const collections = { articles };
