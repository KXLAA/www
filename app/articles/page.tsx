import { Link } from "@/components/anchor";
import { MainLayout } from "@/components/layout";
import { getPublishedArticles } from "@/lib/contentlayer";
import Image from "next/image";
import NextLink from "next/link";

export const metadata = {
  title: `Writing`,
  description: `Articles on web development & any other interesting topics.`,
};

const allArticles = getPublishedArticles();

export default function ArticlesPage() {
  return (
    <MainLayout>
      <NextLink href="/">
        <Image
          src="/common/kola-memoji-cursing.png"
          alt="Kola's profile picture"
          width="100"
          height="100"
        />
      </NextLink>

      <h2 className="md:text-5xl text-4xl font-bold">Writing</h2>
      {allArticles.map((article) => {
        return (
          <div key={article.slug} className="flex flex-col gap-2">
            <span className="text-gray-10 text-lg md:text-xl font-semibold">
              {article.publishedAt}
            </span>

            <Link href={`/articles/${article.slug}`}>{article.title} </Link>
          </div>
        );
      })}
    </MainLayout>
  );
}
