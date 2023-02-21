import { compareDesc, parseISO } from "date-fns";
import { Feed } from "feed";
import { writeFileSync } from "fs";

import { allPosts } from "../.contentlayer/generated/index.mjs";

const feed = new Feed({
  title: "My Blogs",
  link: "https://kxlaa.com/rss.xml",
  url: "https://kxlaa.com/",
  description: "My Blogs",
});

allPosts
  .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  .filter((c) => !c.slug.startsWith("_"))
  .forEach((post) => {
    const url = `https://kxlaa.com/posts/${post._raw.flattenedPath}`;
    feed.addItem({
      id: url,
      link: url,
      title: post.title,
      description: post.description,
      date: parseISO(post.publishedAt),
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
