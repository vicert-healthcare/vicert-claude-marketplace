import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/posts" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    type: z
      .enum([
        "post",
        "link",
        "tip",
        "news",
        "tool",
        "demo",
        "discussion",
        "show-and-tell",
      ])
      .default("post"),
    url: z.string().optional(),
  }),
});

export const collections = { posts };
