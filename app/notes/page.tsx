import { MainLayout } from "@/components/layout";
import { getPublishedNotes } from "@/lib/contentlayer";
import { Link } from "@/components/anchor";
import Image from "next/image";
import NextLink from "next/link";

export const metadata = {
  title: `Notes`,
  description: `Notes on web development & any other interesting topics.`,
};

const allNotes = getPublishedNotes();

export default function NotesPage() {
  return (
    <MainLayout>
      <NextLink href="/">
        <Image
          src="/common/kola-memoji-gasp.png"
          alt="Kola's profile picture"
          width="100"
          height="100"
        />
      </NextLink>

      <h2 className="md:text-5xl text-4xl font-bold">Notes</h2>
      {allNotes.map((note) => {
        return (
          <div key={note.slug} className="flex flex-col gap-2">
            <span className="text-gray-10 text-lg md:text-xl font-semibold">
              {note.publishedAt}
            </span>

            <Link href={`/notes/${note.slug}`}>{note.title} </Link>

            <div className="flex gap-2">
              {note?.tags?.map((tag) => (
                <span className="text-base text-gray-10 font-medium" key={tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </MainLayout>
  );
}
