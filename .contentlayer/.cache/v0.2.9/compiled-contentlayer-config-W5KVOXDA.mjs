// contentlayer.config.ts
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer/source-files";
import readingTime from "reading-time";

// lib/api.ts
import * as fs from "node:fs/promises";
import path from "node:path";
function getHeadings(source) {
  const headings = source.match(/#+\s(.*?)\n/g);
  return headings?.map((h, i) => {
    const content = h.match(/#+\s(.*?)\n/)?.[1].replace(/-{2,}/g, " ");
    const type = headings?.[i].match(/#+/)?.[0];
    const slug = content?.replace(/ /g, "-").toLowerCase();
    const link = "#" + slug;
    return {
      id: slug || "",
      content: content || "",
      link: link || "",
      level: type?.length || 0
    };
  }) || [];
}
var contentDirPath = "content";
async function getLastEditedDate(doc) {
  const stats = await fs.stat(
    path.join(contentDirPath, doc._raw.sourceFilePath)
  );
  return stats.mtime;
}

// lib/mdx-config.ts
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    rehypeCodeTitles,
    rehypePrism,
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ["anchor"]
        }
      }
    ]
  ],
  format: "mdx"
};

// contentlayer.config.ts
var ReadingTime = defineNestedType(() => ({
  name: "readingTime",
  fields: {
    title: {
      type: "string"
    },
    text: {
      type: "string"
    },
    minutes: {
      type: "number"
    },
    time: {
      type: "number"
    },
    words: {
      type: "number"
    }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" }
    },
    ogImage: { type: "string" },
    thumbnail: { type: "string" },
    postId: { type: "string" }
  },
  computedFields: {
    publishedAt: {
      type: "string",
      resolve: (doc) => getLastEditedDate(doc)
    },
    lastUpdatedAt: {
      type: "string",
      resolve: (doc) => getLastEditedDate(doc)
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw)
    },
    headings: {
      type: "nested",
      of: ReadingTime,
      resolve: (doc) => getHeadings(doc.body.raw)
    },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(".mdx", "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath,
  documentTypes: [Post],
  mdx: {
    ...mdxOptions
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-W5KVOXDA.mjs.map
