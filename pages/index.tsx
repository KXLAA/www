import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Copy,
} from "lucide-react";
import Link from "next/link";

import { Avatar } from "@/components/common/Avatar";
import { Layout } from "@/components/common/Layout";
import { Show } from "@/components/common/Show";
import type {
  Experiment as ExperimentsType,
  Post as PostType,
  Project as ProjectType,
} from "@/contentlayer/generated";
import { api, Experience } from "@/lib/api";
import { cx } from "@/lib/cx";
import { useFeature } from "@/lib/flags";
import { useCopyEmail } from "@/lib/hooks/use-copy-email";
import { useDate } from "@/lib/hooks/use-date";
import { generateRSS } from "@/lib/rss";

type HomePageProps = {
  posts: Array<PostType>;
  experiments: Array<ExperimentsType>;
  projects: Array<ProjectType>;
  contacts: Array<{ name: string; href: string }>;
  experience: Array<Experience>;
};

export default function HomePage(props: HomePageProps) {
  const { copyEmail, copied } = useCopyEmail();
  const { date } = useDate();

  return (
    <Layout className="flex flex-col justify-center max-w-lg gap-4 px-4 py-4 text-base md:px-8 md:py-8 md:gap-8 md:text-xl font-extralight">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center text-xs text-[10px] font-medium text-silver-900">
          <p>{date}</p>
          <Activity strokeWidth={1.22} className="w-4 h-4" />
          <p>London, UK 🇬🇧</p>
        </div>

        <div className="flex items-center gap-3">
          <Avatar />

          <div className="text-base font-normal">
            <p className="text-silver-600">Kolade Afode</p>
            <p className="text-sm font-light text-silver-800">
              Frontend Engineer, London UK.
            </p>
          </div>
        </div>
      </div>

      <Experience {...props} />

      <Section heading="Selected Posts">
        {props.posts.slice(0, 2).map((post) => (
          <article key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="flex gap-3 px-0"
              data-splitbee-event={`Click on ${post.title}`}
              data-splitbee-event-contentType="Article"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-base font-normal underline text-silver-600 hover:decoration-dotted">
                  {post.title}
                </p>
                <p className="text-sm font-extralight text-silver-700">
                  {post.description}
                </p>

                <div className="flex items-center gap-1 font-extralight mt-0.5">
                  <Clock className="inline-block w-3 h-3 text-silver-900" />
                  <p className="text-xs font-normal text-silver-900">
                    {post.publishedAt}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}

        <Link
          href="/posts"
          className="text-xs font-bold underline text-silver-900 hover:decoration-dotted"
        >
          View all posts
        </Link>
      </Section>

      <Section heading="Selected Projects">
        {props.projects.map((project) => (
          <a
            key={project.url}
            href={project.url}
            className="flex gap-3 px-0"
            target="_blank"
            rel="noreferrer"
            data-splitbee-event={`Click on ${project.title}`}
          >
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <p className="text-base font-normal underline text-silver-600 hover:decoration-dotted">
                  {project.title}
                </p>
                <ArrowUpRight
                  className="w-5 h-5 text-silver-600"
                  strokeWidth={1.22}
                />
              </div>

              <p className="text-sm font-extralight text-silver-700">
                {project.description}
              </p>
            </div>
          </a>
        ))}
      </Section>

      <Section heading="Contact">
        <div className="grid grid-cols-2 gap-2">
          {props.contacts.map((contact) =>
            contact.name === "Email" ? (
              <button
                key={contact.name}
                className="flex gap-3"
                onClick={copyEmail}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-normal underline text-silver-600 hover:decoration-dotted">
                      {contact.name}
                    </p>
                    {copied ? (
                      <CheckCircle2
                        className={cx("w-4 h-4 text-silver-600")}
                        strokeWidth={1.22}
                      />
                    ) : (
                      <Copy
                        className={cx(
                          "w-4 h-4 text-silver-600 transition-colors hover:text-silver-800"
                        )}
                        strokeWidth={1.22}
                      />
                    )}
                  </div>
                </div>
              </button>
            ) : (
              <a
                key={contact.name}
                href={contact.href}
                className="flex gap-3"
                target="_blank"
                rel="noreferrer"
                data-splitbee-event={`Click on ${contact.name}`}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-normal underline text-silver-600 hover:decoration-dotted">
                      {contact.name}
                    </p>
                    <ArrowUpRight
                      className={cx("w-4 h-4 text-silver-600")}
                      strokeWidth={1.22}
                    />
                  </div>
                </div>
              </a>
            )
          )}
        </div>
      </Section>
    </Layout>
  );
}

function Experience({ experience }: { experience: Array<Experience> }) {
  const isFeatureEnabled = useFeature("experience");

  return (
    <Show when={isFeatureEnabled}>
      <Section heading="Experience">
        {experience.map((e) => (
          <div className="flex flex-col gap-1" key={e.href}>
            <p className="text-base font-normal underline text-silver-600">
              {e.role}
            </p>
            <p className="text-sm font-light text-silver-700">
              <a
                href={e.href}
                target="_blank"
                rel="noreferrer"
                data-splitbee-event={`Click on ${e.company}`}
                className=" text-silver-600 hover:underline hover:decoration-dotted"
              >
                {e.company}
              </a>
              · {e.location}
            </p>
            <p className="text-xs font-medium text-silver-900">{e.date}</p>
          </div>
        ))}
      </Section>
    </Show>
  );
}

type SectionProps = {
  heading: string;
  children: React.ReactNode;
};

function Section(props: SectionProps) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold text-silver-800">
        {props.heading}
      </h2>
      <div className="flex flex-col gap-2">{props.children}</div>
    </div>
  );
}

export const getStaticProps = async () => {
  generateRSS();

  return {
    props: {
      posts: api.posts.minimal,
      experiments: api.experiments.minimal,
      projects: api.projects,
      contacts: api.contacts,
      experience: api.experience,
    },
  };
};
