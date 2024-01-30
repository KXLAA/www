import { getPublishedUIs } from "@/lib/contentlayer/content";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { components } from "@/components/mdx";
import { BreadCrumb } from "@/components/bread-crumb";
import dynamic from "next/dynamic";

const ArcBrowserSplitMode = dynamic(
  () => import("@/components/ui/arc-browser-split-mode")
);

const allUIs = getPublishedUIs();

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  return allUIs.map((ui) => ({ slug: ui.slug }));
}

export default function UIPage({ params }: Props) {
  const ui = allUIs.find((a) => a.slug === params.slug);

  if (!ui) {
    notFound();
  }

  const Content = getMDXComponent(ui.body.code);

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
      <div className="w-1/3 invisible" />

      <article className="mt-4 w-full min-w-0 max-w-6xl px-1 md:px-6 text-xl font-extralight text-gray-11 flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <BreadCrumb
            items={[
              { label: "Home", href: "/" },
              {
                label: ui.title,
                href: `/ui/${ui.slug}`,
                active: true,
              },
            ]}
          />
          <h1 className="text-4xl font-bold text-gray-12">{ui.title}</h1>

          <div className="flex items-center justify-center gap-3 text-gray-dark-11 underline-offset-1 w-fit font-medium text-lg">
            <span className="m-0">{ui.publishedAt}</span>
          </div>
        </div>

        <div className="w-full prose">
          <Content
            components={{
              ...components,
              ArcBrowserSplitMode,
            }}
          />
        </div>
      </article>

      <div className="w-1/3 invisible" />
    </div>
  );
}
