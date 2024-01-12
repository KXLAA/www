import { compareDesc } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { allProjects } from "@/contentlayer/generated";
import { getPublishedArticles } from "@/lib/contentlayer";
import { cx } from "@/lib/cx";

const allArticles = getPublishedArticles();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start m-4 md:m-24 gap-10 md:max-w-2xl">
      <div className="w-full flex flex-col gap-1 md:gap-3">
        <h1 className="text-4xl md:text-6xl font-semibold text-gray-12">
          Kolade Afode
        </h1>
        <p className="md:text-4xl text-lg  font-thin text-gray-11">
          Frontend Engineer, London UK.
        </p>

        <p className="md:text-lg text-sm font-thin  bg-violet-3 border border-violet-6 text-violet-11 p.0.5 px-2 w-fit mt-2">
          Currently, Software Engineer at{" "}
          <ConnectLink name="Twitter" href="https://www.starlingbank.com/">
            Starling Bank
          </ConnectLink>
        </p>
      </div>

      <Section title="Writing">
        <div className="border-y border-gray-6 w-full ">
          {allArticles.slice(0, 4).map((a) => (
            <div
              key={a.slug}
              className="border-b border-gray-6 last:border-b-0 flex flex-col"
            >
              <Link
                href={`/articles/${a.slug}`}
                className="flex flex-col gap-1 hover:bg-gray-2 p-4 hover:border-gray-6  transition-colors border-b border-gray-6 last:border-b-0"
                key={a.slug}
              >
                <p className="text-xl md:text-2xl font-medium text-gray-11">
                  {a.title}
                </p>

                <div className="flex gap-1 md:text-lg text-base text-gray-10 text-light">
                  {a.description}
                </div>

                <p className="flex text-sm text-gray-9 font-medium mt-1">
                  {a.publishedAt}
                </p>
              </Link>
            </div>
          ))}
          <Link
            className="border-b justify-between border-gray-6 last:border-b-0 flex items-start hover:text-gray-12 hover:bg-gray-2 transition-colors text-gray-10 text-lg p-2 px-4 font-semibold group"
            href="/articles"
          >
            <div>view all</div>
            <ChevronRightIcon className="transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </Section>
      <Section title="Projects">
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
      </Section>

      <div className="text-lg md:text-xl border p-4 border-gray-6 text-gray-11">
        <p>
          You can react me at{" "}
          <ConnectLink name="Twitter" href="https://twitter.com/kxlaa_">
            @kxlaa_
          </ConnectLink>
          or{" "}
          <ConnectLink
            name="Email"
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
          >
            Email
          </ConnectLink>
          . You can view my code{" "}
          <ConnectLink name="GitHub" href="https://github.com/KXLAA">
            @kxlaa
          </ConnectLink>{" "}
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
    </main>
  );
}

type SectionProps = {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

function Section(props: SectionProps) {
  return (
    <div className="flex flex-col border-gray-6  border w-full border-b-0">
      <div className="p-3 md:px-8  bg-gray-2 flex justify-between items-center">
        <h2 className="text-2xl md:text-4xl font-semibold">{props.title}</h2>
        {props.action && <div>{props.action}</div>}
      </div>

      <div className="flex flex-col">{props.children}</div>
    </div>
  );
}

type ConnectLinkProps = {
  name: string;
  href: string;
  children: React.ReactNode;
  className?: string;
};

function ConnectLink(props: ConnectLinkProps) {
  return (
    <a
      key={props.name}
      href={props.href}
      className={cx(
        "underline transition-all duration-150 hover:text-gray-12 underline-offset-2",
        props.className
      )}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
}
