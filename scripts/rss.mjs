import { compareDesc, parseISO } from "date-fns";
import { Feed } from "feed";
import { writeFileSync } from "fs";

import { allPosts } from "../.contentlayer/generated/index.mjs";

const feed = new Feed({
  title: "My Blogs",
  link: "localhost:3000/rss.xml",
  url: "localhost:3000",
  description: "My Blogs",
});

allPosts
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  .forEach((post) => {
    const url = `https://kxlaa.com/posts/${post._raw.flattenedPath}`;
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.description,
      date: parseISO(post.date),
      category: post.tags.map((name) => ({ name })),
      author: [
        {
          name: "Kolade Afode",
          email: "koladeboss@icloud.com",
          link: "https://kxlaa.com",
        },
      ],
    });
  });

writeFileSync("./public/rss.xml", feed.rss2(), { encoding: "utf-8" });
