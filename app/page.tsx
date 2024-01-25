import { Anchor, Link } from "@/components/anchor";
import { MainLayout } from "@/components/layout";
import { getPublishedArticles, getPublishedNotes } from "@/lib/contentlayer";
import { BlurImage } from "@/components/blur-image";

const allArticles = getPublishedArticles();
const allNotes = getPublishedNotes();

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-12">
        <BlurImage
          src="/common/kola-memoji-wink.png"
          alt="Kola's profile picture"
          width={100}
          height={100}
        />
        <div className="w-full flex flex-col gap-1 md:gap-3">
          <p>
            Hi! {`I'm`} Kola. {`I'm`} a software engineer based in London, UK.
          </p>
        </div>

        <p>
          Currently, I am employed at{" "}
          <Anchor name="Starling Bank" href="https://www.starlingbank.com/">
            Starling Bank
          </Anchor>{" "}
          , where I work on the Online Bank & on internal tools to assist
          engineers build and ship features more efficiently and quickly.
        </p>

        <div className="flex flex-col gap-8">
          <p>
            I write about technology, web development and other things that
            interest me. Here is a list of my recent blog posts:
          </p>
          <ul className="list-disc space-y-4 ml-7 marker:text-gray-10 leading-normal">
            {allArticles.slice(0, 4).map((article) => {
              return (
                <li key={article.slug}>
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}{" "}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/articles" className="text-xl md:text-2xl text-gray-11">
            View more
          </Link>
        </div>

        {allNotes.length > 0 && (
          <div className="flex flex-col gap-8">
            <p>
              I write interactive notes of concepts I learn and things I find,
              here are some of my recent notes:
            </p>

            <ul className="list-disc space-y-4 ml-7 marker:text-gray-10">
              {allNotes.slice(0, 4).map((note) => {
                return (
                  <li key={note.slug} className="cursor-pointer">
                    <Link
                      href={`/notes/${note.slug}`}
                      className="underline decoration-dashed underline-offset-4 decoration-green-9 "
                    >
                      {note.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link href="/notes" className="text-xl md:text-2xl text-gray-11">
              View more
            </Link>
          </div>
        )}

        <div className="text-gray-11">
          <p>
            You can react me at{" "}
            <Anchor name="Twitter" href="https://twitter.com/kxlaa_">
              @kxlaa_
            </Anchor>
            or{" "}
            <Anchor
              name="Email"
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            >
              Email
            </Anchor>
            . You can view my code{" "}
            <Anchor name="GitHub" href="https://github.com/KXLAA">
              @kxlaa
            </Anchor>{" "}
            on GitHub.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
