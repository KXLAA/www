import fs from "fs";
import matter from "gray-matter";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import readingTime from "reading-time";

import { Layout } from "@/components/common/Layout";
import { PostLayout } from "@/components/posts/PostLayout";
import { getHeadings, postFilePaths, POSTS_PATH } from "@/lib/api";
import { mdxOptions } from "@/lib/mdx-config";
import type { MetaProps } from "@/types/layout";
import type { PostType } from "@/types/post";

const MDXComponents = {
  Head,
  Image,
  Link,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
};

const PostPage = ({ source, frontMatter }: PostPageProps): JSX.Element => {
  const customMeta: MetaProps = {
    title: `${frontMatter.title} - Kolade Afode`,
    description: frontMatter.description,
    date: frontMatter.date,
    type: "article",
  };

  return (
    <Layout customMeta={customMeta} className="gap-0" light>
      <PostLayout {...frontMatter}>
        <MDXRemote {...source} components={MDXComponents} />
      </PostLayout>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params?.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      ...mdxOptions,
    },
    scope: data,
  });

  // console.log(getHeadings(content));

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        ...data,
        slug: params?.slug,
        duration: readingTime(content).text,
        headings: getHeadings(content),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
