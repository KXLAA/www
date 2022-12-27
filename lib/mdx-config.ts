import type { CompileOptions } from "@mdx-js/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type MDXConfig =
  | Omit<CompileOptions, "outputFormat" | "providerImportSource">
  | undefined;

export const rehypePrettyCodeOptions: Partial<Options> = {
  // use a prepackaged theme
  theme: "one-dark-pro",
  // or import a custom theme
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
  },
};

export const mdxOptions: MDXConfig = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, rehypePrettyCodeOptions],
    [
      rehypeAutolinkHeadings,
      {
        properties: {
          className: ["anchor"],
        },
      },
    ],
  ],
  format: "mdx",
};
