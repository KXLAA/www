import { Anchor } from "@/components/anchor";
import { Articles } from "@/components/articles/articles";
import { MainLayout, PageSection } from "@/components/layout";
import { Notes } from "@/components/notes/notes";
import { allProjects } from "@/contentlayer/generated";

export default function Home() {
  return (
    <MainLayout>
      <div className="w-full flex flex-col gap-1 md:gap-3">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-12">
          Kolade Afode
        </h1>
        <p className="md:text-4xl text-lg  font-thin text-gray-11">
          Frontend Engineer, London UK.
        </p>

        <p className="md:text-lg text-sm font-thin  bg-violet-3 border border-violet-6 text-violet-11 p.0.5 px-2 w-fit mt-2">
          Currently, Software Engineer at{" "}
          <Anchor name="Twitter" href="https://www.starlingbank.com/">
            Starling Bank
          </Anchor>
        </p>
      </div>

      <Articles showAllLink />

      <Notes showAllLink />

      <PageSection title="Projects">
        {allProjects.map((a) => (
          <a
            className="hover:bg-gray-2 p-4 hover:border-gray-6 transition-colors border-b first:border-t border-gray-6"
            key={a.url}
            href={a.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-xl md:text-2xl font-medium text-gray-11">
              {a.title}
            </div>

            <div className="flex gap-1 md:text-lg text-base text-gray-10 text-light">
              {a.description}
            </div>
          </a>
        ))}
      </PageSection>

      <div className="text-lg md:text-xl border p-4 border-gray-6 text-gray-11">
        <p>
          You can react me at{" "}
          <Anchor name="Twitter" href="https://twitter.com/kxlaa_">
            @kxlaa_
          </Anchor>
          or{" "}
          <Anchor name="Email" href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
            Email
          </Anchor>
          . You can view my code{" "}
          <Anchor name="GitHub" href="https://github.com/KXLAA">
            @kxlaa
          </Anchor>{" "}
          on GitHub.
        </p>
      </div>

      <a
        href="https://github.com/KXLAA/www"
        className="font-mono text-xs text-gray-10 transition-colors hover:text-gray-11"
        target="_blank"
        rel="noreferrer"
      >
        View Source
      </a>
    </MainLayout>
  );
}
