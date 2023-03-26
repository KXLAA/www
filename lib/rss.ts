import { Feed } from "feed";
import fs from "fs";

import { api } from "@/lib/api";

export default function generateRSS() {
  const baseUrl = "https://www.kxlaa.com";
  const date = new Date();
  const author = {
    name: "Kolade Afode",
    email: "Koladeboss@icloud.com",
    link: "https://twitter.com/kxlaa_",
  };

  const feed = new Feed({
    title: "Articles by Kola",
    description:
      "Articles on web development, React  & any other interesting topics.",
    id: baseUrl,
    link: baseUrl,
    image:
      "https://ucarecdn.com/2fecb5b1-ed81-47b7-917d-b5c70f3ed733/mainogimage.jpg",
    favicon: `/favicon-32x32.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Kola`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  });

  api.posts.published.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://kxlaa.com/posts/${post._raw.flattenedPath}`,
      link: `https://kxlaa.com/posts/${post._raw.flattenedPath}`,
      date: new Date(post.publishedAt),
      description: post.description,
      content: post.body.raw,
      author: [author],
      contributor: [author],
    });
  });

  fs.writeFileSync("public/rss.xml", feed.rss2());
}
