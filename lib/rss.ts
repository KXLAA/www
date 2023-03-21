/* eslint-disable @typescript-eslint/ban-ts-comment */
import { parseISO } from "date-fns";
import { promises as fs } from "fs";
import RSS from "rss";

import { api } from "@/lib/api";

export default async function generateRSS() {
  const feed = new RSS({
    title: "Kola | Frontend Engineer",
    description: "Do it with flair ✨",
    site_url: "https://www.kxlaa.com",
    feed_url: "https://www.kxlaa.com/feed.xml",
    language: "en",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Kola`,
  });

  api.posts.published.forEach((post) => {
    feed.item({
      title: post.title,
      url: `https://kxlaa.com/posts/${post._raw.flattenedPath}`,
      date: parseISO(post.publishedAt),
      description: post.description,
      author: "Kolade Afode",
    });
  });

  await fs.writeFile("./public/feed.xml", feed.xml({ indent: true }));
}
