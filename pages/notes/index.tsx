import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import { Header } from "@/components/home/Header";
import type { Note as NoteType } from "@/contentlayer/generated";
import { api } from "@/lib/api";
import { useFeatures } from "@/lib/flags";

type NotesPageProps = {
  notes: NoteType[];
};

export default function Notes(props: NotesPageProps) {
  const features = useFeatures();

  if (!features.notes) return null;

  return (
    <Layout
      className="flex flex-col justify-center max-w-[540px] gap-6 px-4 py-4 text-base md:px-8 md:py-8 md:text-xl font-extralight"
      customMeta={{
        title: `Kola | Notes`,
        description: `Notes on web development, React  & any other interesting topics.`,
      }}
    >
      <Header
        heading="Notes."
        subheading="Notes on web development, React  & any other interesting topics."
      />

      <div className="flex flex-col gap-1">
        {props.notes.map((note) => (
          <article key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              className="flex gap-3 px-0 py-2"
              data-splitbee-event={`Click on ${note.title}`}
            >
              <div className="flex flex-col sm:flex-row justify-between gap-0.5 w-full">
                <p className="text-lg font-medium transition-colors text-silver-600 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy">
                  {note.title}
                </p>
                <p className="mt-2 text-xs font-normal text-silver-900">
                  {note.publishedAt}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      notes: api.notes.minimal,
    },
  };
};
