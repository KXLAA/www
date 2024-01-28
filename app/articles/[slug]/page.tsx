import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getMDXComponent } from "next-contentlayer/hooks";

import { components } from "@/components/mdx";
import { getPublishedArticles } from "@/lib/contentlayer/content";

import { ArticleHeader } from "./header";
import { ArticleSeries } from "./series";
import { ArticleSidebar } from "./sidebar";

const DroppableDnd = dynamic(
  () => import("@/components/articles/drag-and-drop-post/droppable-dnd-widget")
);
const DroppableDndSandPack = dynamic(
  () =>
    import(
      "@/components/articles/drag-and-drop-post/droppable-dnd-code-playground"
    )
);
const FreeDnd = dynamic(
  () => import("@/components/articles/drag-and-drop-post/free-dnd-widget")
);
const FreeDnDSandPack = dynamic(
  () =>
    import("@/components/articles/drag-and-drop-post/free-dnd-code-playground")
);
const SortableDnd = dynamic(
  () => import("@/components/articles/drag-and-drop-post/sortable-dnd-widget")
);
const SortableDndSandPack = dynamic(
  () =>
    import(
      "@/components/articles/drag-and-drop-post/sortable-dnd-code-playground"
    )
);
const SortableMultiDnd = dynamic(
  () =>
    import("@/components/articles/drag-and-drop-post/sortable-multi-dnd-widget")
);

const SortableMultiDndSandPack = dynamic(
  () =>
    import(
      "@/components/articles/drag-and-drop-post/sortable-multi-dnd-code-playground"
    )
);

const Steps = dynamic(() => import("@/components/steps"));
const StepsItem = dynamic(() => import("@/components/steps/item"));
const CodeBlock = dynamic(() => import("@/components/code-block"));

const allArticles = getPublishedArticles();

type GenerateMetadataProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: GenerateMetadataProps) {
  const article = allArticles.find((a) => a.slug === params.slug);
  if (!article) {
    return;
  }

  const path = `/articles/${article.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `${article.title}`;

  return {
    title: title,
    description: article.description,
    openGraph: {
      title,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["https://kxlaa.com"],
      tags: article.tags,
      images: [
        {
          url: article.og,
          width: 1200,
          height: 600,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.description,
      images: [article.og],
    },
  };
}

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return allArticles.map((post) => ({ slug: post.slug }));
}

export default function ArticlePage({ params }: Props) {
  const article = allArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const Content = getMDXComponent(article.body.code);

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
      <div className="w-1/3 invisible" />

      <article className="mt-4 w-full min-w-0 max-w-6xl px-1 md:px-6 text-xl font-extralight text-gray-11 flex flex-col gap-2">
        <ArticleHeader article={article} />

        {article.series ? <ArticleSeries article={article} /> : null}

        <div className="w-full prose">
          <Content
            components={{
              ...components,
              DroppableDnd,
              DroppableDndSandPack,
              FreeDnd,
              FreeDnDSandPack,
              SortableDnd,
              SortableDndSandPack,
              SortableMultiDnd,
              SortableMultiDndSandPack,
              CodeBlock,
              Steps,
              StepsItem,
            }}
          />
        </div>
      </article>

      <ArticleSidebar headings={article.headings} />
    </div>
  );
}
