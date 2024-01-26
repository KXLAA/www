import { BreadCrumb } from "@/components/bread-crumb";
import { PartialArticle } from "@/lib/contentlayer";

type Props = {
  note: PartialArticle;
};

export function NoteHeader({ note }: Props) {
  return (
    <header className="flex flex-col gap-4">
      <BreadCrumb
        items={[
          { label: "Home", href: "/" },
          {
            label: note.title,
            href: `/notes/${note.slug}`,
            active: true,
          },
        ]}
      />
      <h1 className="text-4xl font-bold text-gray-12">{note.title}</h1>

      <div className="flex items-center justify-center gap-3 text-gray-dark-11 underline-offset-1 w-fit font-medium text-lg">
        <span className="m-0">Last edited on {note.lastUpdatedAt}</span>
      </div>
    </header>
  );
}
