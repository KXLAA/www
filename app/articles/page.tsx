import { Articles } from "@/components/articles/articles";
import { BreadCrumb } from "@/components/bread-crumb";
import { MainLayout } from "@/components/layout";

export const metadata = {
  title: `Writing`,
  description: `Articles on web development & any other interesting topics.`,
};

export default function ArticlesPage() {
  return (
    <MainLayout>
      <BreadCrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Writing", href: "/articles", active: true },
        ]}
      />

      <Articles />
    </MainLayout>
  );
}
