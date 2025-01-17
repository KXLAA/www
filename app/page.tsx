import { Anchor, Link } from "@/components/anchor";
import { BlurImage } from "@/components/blur-image";
import { MainLayout } from "@/components/layout";
import { content } from "@/lib/contentlayer/content";

const { articles } = content;

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col gap-12">
        <BlurImage
          src="/common/kola-memoji-wink.png"
          alt="Kola's profile picture"
          width={150}
          height={150}
        />
        <div className="w-full flex flex-col gap-1 md:gap-3">
          <p>Hi! {`I'm`} Kola, a software engineer based in London, UK.</p>
        </div>

        <p>
          I am currently employed at{" "}
          <Anchor name="Starling Bank" href="https://www.starlingbank.com/">
            Starling Bank
          </Anchor>{" "}
          , where I work on the Online Bank & on internal tools that assist
          engineers in building and shipping features more efficiently and
          quickly.
        </p>

        <p>
          On the side, I am building{" "}
          <Anchor name="Cratebase" href="https://www.cratebase.app/">
            Cratebase
          </Anchor>
          , the OS for DJ music libraries.
        </p>

        <div className="flex flex-col gap-8">
          <p>
            I write about technology, web development, and other things that
            interest me. Here is a list of my recent blog posts:
          </p>
          <ul className="list-disc space-y-4 ml-7 marker:text-gray-10 leading-normal">
            {articles.slice(0, 6).map((article) => {
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
            View all
          </Link>
        </div>



        <div>
          <p>
            You can reach me at{" "}
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