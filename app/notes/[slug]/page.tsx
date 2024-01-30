import { getPublishedNotes } from "@/lib/contentlayer/content";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";
import { NoteHeader } from "./header";
import { NoteSidebar } from "./sidebar";
import { components } from "@/components/mdx";
import dynamic from "next/dynamic";

const Steps = dynamic(() => import("@/components/steps"));
const StepsItem = dynamic(() => import("@/components/steps/item"));
const CodeBlock = dynamic(() => import("@/components/code-block"));
const ToggleHeading = dynamic(() => import("@/components/toggle-heading"));
const ToggleHeadingTitle = dynamic(
  () => import("@/components/toggle-heading/title")
);
const ToggleHeadingContent = dynamic(
  () => import("@/components/toggle-heading/content")
);

const notes = getPublishedNotes();

type GenerateMetadataProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: GenerateMetadataProps) {
  const note = notes.find((a) => a.slug === params.slug);

  if (!note) {
    return;
  }

  const path = `/notes/${note.slug}`;
  const url = `https://kxlaa.com${path}`;
  const title = `${note.title}`;

  return {
    title: title,
    description: note.description,
    openGraph: {
      title,
      description: note.description,
      url,
      type: "article",
      publishedTime: note.publishedAt,
      authors: ["https://kxlaa.com"],
      tags: note.tags,
      images: [
        {
          url: note.og,
          width: 1200,
          height: 600,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: note.description,
      images: [note.og],
    },
  };
}

export async function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

type Props = {
  params: {
    slug: string;
  };
};

export default function NotePage({ params }: Props) {
  const note = notes.find((a) => a.slug === params.slug);

  if (!note) {
    notFound();
  }

  const Content = getMDXComponent(note.body.code);

  return (
    <div className="relative mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
      <div className="w-1/3 invisible" />

      <article className="mt-4 w-full min-w-0 max-w-6xl px-1 md:px-6 text-xl font-extralight text-gray-11 flex flex-col gap-2">
        <NoteHeader note={note} />

        <div className="w-full prose">
          <Content
            components={{
              ...components,
              CodeBlock,
              Steps,
              StepsItem,
              ToggleHeading,
              ToggleHeadingTitle,
              ToggleHeadingContent,
            }}
          />
        </div>
      </article>

      <NoteSidebar headings={note.headings} />
    </div>
  );
}
