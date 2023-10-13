import Link from "next/link";

import { Layout } from "@/components/common/Layout";
import type { Experiment, Post, Project } from "@/contentlayer/generated";
import type { Experience as ExperienceType } from "@/lib/api";
import { api } from "@/lib/api";
import { generateRSS } from "@/lib/rss";

type HomePageProps = {
  posts: Array<Post>;
  experiments: Array<Experiment>;
  projects: Array<Project>;
  experience: Array<ExperienceType>;
};

export default function Home(props: HomePageProps) {
  return (
    <Layout className="flex flex-col items-center w-full min-h-screen gap-8 p-10 text-gray-dark-12">
      <div className="flex flex-col items-start w-full max-w-xl gap-8">
        <div>
          <h1 className="text-6xl font-semibold">
            Kola<span className="text-orange-dark-10">-</span>de
            <span className="text-orange-dark-10">.</span>
          </h1>
          <p className="text-3xl font-light">Frontend Engineer, London UK.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Writing</h2>
          <div className="flex flex-col gap-2">
            {props.posts.slice(0, 4).map((post) => (
              <article key={post.slug} className="pb-2">
                <Link
                  href={`/posts/${post.slug}`}
                  className="flex gap-3 px-0"
                  data-splitbee-event={`Click on ${post.title}`}
                >
                  <div className="flex flex-col">
                    <p className="text-2xl font-medium transition-colors text-gray-dark-11 hover:text-gray-dark-10">
                      {post.title}
                    </p>

                    <div className="flex gap-1 text-sm font-medium text-gray-dark-10">
                      {post.publishedAt}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          {props.posts.length >= 4 && (
            <Link
              href="/posts"
              className="self-start text-lg font-semibold transition-all text-orange-dark-10 hover:text-orange-dark-9"
            >
              View all posts
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">Projects</h2>
          <div className="flex flex-col gap-4">
            {props.projects.map((project) => (
              <a
                key={project.url}
                href={project.url}
                data-splitbee-event={`Click on ${project.title}`}
                target="_blank"
                rel="noreferrer"
              >
                <p className="text-2xl font-medium transition-colors text-gray-dark-11 hover:text-gray-dark-10">
                  {project.title}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="w-full h-px border-t-2 border-dashed border-gray-dark-5" />

        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium text-gray-dark-12">
            Hi, I'm Kola. I'm a frontend engineer based in London, UK. You can
            react me at{" "}
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

          {/* <p className="text-xl font-medium text-gray-dark-11">
            View some cool of{" "}
            <Link
              className="underline transition-all duration-200 hover:text-gray-dark-10 underline-offset-2"
              href="/experiments"
            >
              my cool experiments
            </Link>{" "}
            or my long list of{" "}
            <Link
              className="underline transition-all duration-200 hover:text-gray-dark-10 underline-offset-2"
              href="/experiments"
            >
              Today I Learned
            </Link>{" "}
            posts.
          </p> */}
        </div>
      </div>
    </Layout>
  );
}

type ConnectLinkProps = {
  name: string;
  href: string;
  children: React.ReactNode;
};

function ConnectLink(props: ConnectLinkProps) {
  return (
    <a
      key={props.name}
      href={props.href}
      className="underline transition-all duration-200 hover:text-gray-dark-11 underline-offset-2"
      target="_blank"
      rel="noreferrer"
      data-splitbee-event={`Click on ${props.name}`}
    >
      {props.children}
    </a>
  );
}

export const getStaticProps = async () => {
  generateRSS();

  return {
    props: {
      posts: api.posts.minimal,
      experiments: api.experiments.minimal,
      projects: api.projects,
      experience: api.experience,
    },
  };
};
