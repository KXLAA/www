"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { PartialArticle } from "@/lib/contentlayer";
import { cx } from "@/lib/cx";

type Props = {
  article: PartialArticle;
};

export function ArticleSeries({ article }: Props) {
  const { series } = article;
  const [open, setOpen] = React.useState(false);

  if (!series) {
    return null;
  }

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className="w-full border border-gray-6 my-6 group"
    >
      <Collapsible.Trigger className="w-full p-2 bg-gray-2 border-b border-gray-6  group-data-[state=closed]:border-b-0 flex justify-between items-center">
        <div className="w-full flex flex-col text-start gap-1">
          <div className="text-xs text-gray-11 font-bold border-b border-gray-6 pb-1 group-hover:border-gray-8 transition-all ">
            SERIES
          </div>
          <p className="text-xl font-semibold">{article.series?.title}</p>
        </div>

        <ChevronDownIcon
          className="w-10 h-10 text-gray-6 group-data-[state=closed]:rotate-0 transition-all group-data-[state=open]:rotate-180 group-hover:text-gray-8"
          strokeWidth={1}
        />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <div className="flex flex-col">
          {article?.series?.articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className={cx(
                "flex items-center gap-2 p-2 hover:bg-gray-2 border-b border-gray-6 transition-all last:border-b-0",
                article.isCurrent ? "bg-gray-2 border-gray-6" : "",
                article.status === "draft"
                  ? "text-gray-8 pointer-events-none"
                  : ""
              )}
            >
              <div className="text-base bg-gray-2  flex items-center justify-center w-7 h-7 border border-gray-6 text-gray-10 rounded-full font-black">
                {article.order}{" "}
              </div>
              <div className="flex flex-col">
                <p className="text-base font-semibold">{article.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
