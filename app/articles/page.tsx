import Link from "next/link";

import { BreadCrumb } from "@/components/bread-crumb";
import { getPublishedArticles } from "@/lib/contentlayer";

const articles = getPublishedArticles();

export const metadata = {
  title: `Writing`,
  description: `Articles on web development & any other interesting topics.`,
};

export default function Articles() {
  return (
    <main className="flex min-h-screen flex-col items-start m-4 md:m-24 gap-10 md:max-w-3xl">
      <BreadCrumb
        items={[
          { label: "Home", href: "/" },
          { label: "All Articles", href: "/articles", active: true },
        ]}
      />

      <Section title="All Articles">
        {articles.map((a) => (
          <Link
            href={`/articles/${a.slug}`}
            className="border-b border-gray-6 first:border-t p-4 flex flex-col gap-1 hover:bg-gray-2 hover:border-gray-6  transition-colors"
            key={a.slug}
          >
            <p className="text-2xl font-medium text-gray-11">{a.title}</p>
            <div className="flex gap-1 text-lg text-gray-10 text-light">
              {a.description}
            </div>
            <p className="flex text-sm text-gray-9 font-medium mt-1">
              {a.publishedAt}
            </p>
          </Link>
        ))}
      </Section>
    </main>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

function Section(props: SectionProps) {
  return (
    <div className="flex flex-col border-gray-6  border w-full border-b-0">
      <div className="p-3 md:px-8  bg-gray-2 flex justify-between items-center">
        <h2 className="text-2xl md:text-4xl font-semibold">{props.title}</h2>
        {props.action && <div>{props.action}</div>}
      </div>

      <div className="flex flex-col">{props.children}</div>
    </div>
  );
}
