import { BreadCrumb } from "@/components/bread-crumb";
import { MainLayout } from "@/components/layout";
import { Notes } from "@/components/notes/notes";

export const metadata = {
  title: `Notes`,
  description: `Notes on web development & any other interesting topics.`,
};

export default function NotesPage() {
  return (
    <MainLayout>
      <BreadCrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Notes", href: "/notes", active: true },
        ]}
      />

      <Notes />
    </MainLayout>
  );
}
