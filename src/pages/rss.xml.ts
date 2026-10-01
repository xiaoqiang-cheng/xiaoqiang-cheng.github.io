import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import config from "@/config";
import { excerpt } from "@/utils/excerpt";

export async function GET() {
  const posts = await getCollection("posts");
  const sortedPosts = getSortedPosts(posts);

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    items: sortedPosts.map(({ data, id, filePath, body }) => ({
      link: getPostUrl(id, filePath, config.site.lang),
      title: data.title,
      description: data.description || excerpt(body, 200),
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
