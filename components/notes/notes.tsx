import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { PageSection } from "@/components/layout";
import { getPublishedNotes } from "@/lib/contentlayer";

const allNotes = getPublishedNotes();

type NotesProps = {
  showAllLink?: boolean;
};

export function Notes(props: NotesProps) {
  const notes = props.showAllLink ? allNotes.slice(0, 4) : allNotes;

  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <PageSection title="Notes">
        {notes.map((note) => (
          <Link
            href={`/notes/${note.slug}`}
            className="border-b border-gray-6 first:border-t p-4 flex flex-col gap-1 hover:bg-gray-2 hover:border-gray-6  transition-colors"
            key={note.slug}
          >
            <p className="text-2xl font-medium text-gray-11">{note.title}</p>

            <div className="w-full justify-between flex">
              <p className="flex text-sm text-gray-9 font-medium mt-1">
                {note.publishedAt}
              </p>
              <div className="flex gap-2">
                {note?.tags?.map((tag) => (
                  <span
                    className="text-sm border px-2 border-gray-6 text-gray-10 font-medium"
                    key={tag}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </PageSection>
      {props.showAllLink && (
        <Link
          className="border justify-between border-gray-6 flex items-start hover:text-gray-12 hover:bg-gray-2 transition-colors text-gray-10 text-lg p-2 px-4 font-semibold group"
          href="/notes"
        >
          <div>view all</div>
          <ChevronRightIcon className="transform group-hover:translate-x-2 transition-transform" />
        </Link>
      )}
    </div>
  );
}
