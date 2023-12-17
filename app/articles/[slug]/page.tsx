import dynamic from "next/dynamic";
import { getMDXComponent } from "next-contentlayer/hooks";

import { components } from "@/components/mdx";
import { allArticles, Article } from "@/contentlayer/generated";

import { ArticleHeader } from "./header";
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

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return allArticles.map((post) => ({ slug: post.slug }));
}

export default function ArticlePage({ params }: Props) {
  const article = allArticles.find((a) => a.slug === params.slug) as Article;
  const Content = getMDXComponent(article.body.code);

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
      <div className="w-1/3 invisible" />

      <article className="mt-4 w-full min-w-0 max-w-6xl px-1 md:px-6 text-xl font-extralight text-gray-11 flex flex-col gap-2">
        <ArticleHeader article={article} />
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
            }}
          />
        </div>
      </article>

      <ArticleSidebar headings={article.headings} />
    </div>
  );
}
