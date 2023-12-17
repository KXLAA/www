import Link from "next/link";

import { BreadCrumb } from "@/components/bread-crumb";
import { allArticles } from "@/contentlayer/generated";

export default function Articles() {
  return (
    <main className="flex min-h-screen flex-col items-start m-4 md:m-24 gap-10 md:max-w-2xl">
      <BreadCrumb
        items={[
          { label: "Home", href: "/" },
          { label: "All Articles", href: "/articles", active: true },
        ]}
      />

      <Section title="All Articles">
        {allArticles.map((a) => (
          <Link
            href={`/articles/${a.slug}`}
            className="flex flex-col gap-1 hover:bg-gray-2 p-2 hover:border-gray-6  transition-colors"
            key={a.slug}
          >
            <p className="text-2xl font-medium text-gray-11">{a.title}</p>

            <div className="flex gap-1 text-lg text-gray-10 text-light">
              {a.description}
            </div>
            <div className="flex text-sm text-gray-9 font-light pt-2 border-t border-gray-6">
              November 30, 2023
            </div>
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
    <div className="flex flex-col gap-4 border-gray-6  border w-full">
      <div className="p-3 md:px-8 border-b border-gray-6 bg-gray-2 flex justify-between items-center">
        <h2 className="text-2xl md:text-4xl font-semibold">{props.title}</h2>
        {props.action && <div>{props.action}</div>}
      </div>

      <div className="flex flex-col gap-6 md:p-6 md:pt-4 p-2 pt-0">
        {props.children}
      </div>
    </div>
  );
}
