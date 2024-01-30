import { BlurImage } from "@/components/blur-image";
import { MainLayout } from "@/components/layout";
import NextLink from "next/link";
import { Link } from "@/components/anchor";
import { notFound } from "next/navigation";
import { getPublishedUIs } from "@/lib/contentlayer/content";

const allUIs = getPublishedUIs();

export const metadata = {
  title: `UI`,
  description: `Some cool UI interactions & elements I come across on the
  web, remade by me.`,
};

export default function UIPage() {
  if (!allUIs || allUIs.length === 0) {
    notFound();
  }

  return (
    <MainLayout>
      <NextLink href="/">
        <BlurImage
          src="/common/kola-memoji-gasp.png"
          alt="Kola's profile picture"
          width={150}
          height={150}
        />
      </NextLink>

      <h2 className="md:text-5xl text-4xl font-bold">UI</h2>
      {allUIs.map((ui) => {
        return (
          <div key={ui.slug} className="flex flex-col gap-2">
            <span className="text-gray-10 text-lg md:text-xl font-semibold">
              {ui.publishedAt}
            </span>

            <Link href={`/ui/${ui.slug}`}>{ui.title} </Link>

            <div className="flex gap-2">
              {ui?.tags?.map((tag) => (
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
