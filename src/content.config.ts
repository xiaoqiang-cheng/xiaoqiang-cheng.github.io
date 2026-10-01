import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";

/** 文章目录：content/posts/<年份>/<slug>/index.md，图片与文章放在同一目录 */
export const BLOG_PATH = "content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        /** 发布时间，支持 2024-05-10 或 2024-05-10T23:00:00+08:00 */
        date: z.coerce.date(),
        /** 更新时间（可选） */
        updated: z.coerce.date().optional(),
        /** 摘要（可选，列表与 SEO 使用） */
        description: z.string().default(""),
        tags: z.array(z.string()).default(["未分类"]),
        /** 草稿：true 时不发布（本地 dev 可见） */
        draft: z.boolean().default(false),
        /** 首页置顶 */
        featured: z.boolean().default(false),
        /** 封面 / 分享图（可选，相对路径） */
        cover: image().or(z.string()).optional(),
        author: z.string().default(config.site.author),
        canonicalURL: z.string().optional(),
        hideEditPost: z.boolean().optional(),
        timezone: z.string().optional(),
      })
      // 对内保持 AstroPaper 的字段名，对外暴露更直白的 frontmatter
      .transform(d => ({
        ...d,
        pubDatetime: d.date,
        modDatetime: d.updated ?? null,
        ogImage: d.cover,
      })),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

/** 项目 / 工具展示：content/projects/<slug>.md，正文为详细介绍（可为空） */
const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./content/projects" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().optional(),
      repo: z.string().optional(),
      image: image().optional(),
      tags: z.array(z.string()).default([]),
      /** 排序，越小越靠前 */
      order: z.number().default(100),
      featured: z.boolean().default(false),
    }),
});

export const collections = { posts, pages, projects };
