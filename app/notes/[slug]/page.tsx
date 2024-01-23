import { getPublishedNotes } from "@/lib/contentlayer";
import { getMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

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
    </div>
  );
}
