import { parseISO } from "date-fns";
import { Feed } from "feed";
import fs from "fs";

import { api } from "@/lib/api";

export default async function generateRSS() {
  const date = new Date();
  const author = {
    name: "Kolade Afode",
    email: "Koladeboss@icloud.com",
    link: "https://twitter.com/kxlaa_",
  };

  const feed = new Feed({
    title: "Kola | Articles",
    description: "",
    id: "https://www.kxlaa.com",
    link: "https://www.kxlaa.com",
    image:
      "https://ucarecdn.com/2fecb5b1-ed81-47b7-917d-b5c70f3ed733/mainogimage.jpg",
    favicon: `/favicon-32x32.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Kola`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `/rss/feed.xml`,
      json: `/rss/feed.json`,
      atom: `/rss/atom.xml`,
    },
    author,
  });

  api.posts.published.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://kxlaa.com/posts/${post._raw.flattenedPath}`,
      link: `https://kxlaa.com/posts/${post._raw.flattenedPath}`,
      date: parseISO(post.publishedAt),
      description: post.description,
      content: post.description,
      author: [author],
      contributor: [author],
    });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
}
