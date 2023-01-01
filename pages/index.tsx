import type { GetStaticProps } from "next";
import Link from "next/link";

import type { Post as PostType } from "@/contentlayer/generated";
import { allPosts } from "@/contentlayer/generated";

type HomeProps = {
  posts: PostType[];
};

export default function Home(props: HomeProps) {
  const posts = props.posts;

  return (
    <div className="bg-shark-700 main-layout text-silver">
      <header className="flex justify-between p-10">
        <Link
          aria-current="page"
          className="!text-blue-500 font-medium"
          href="/"
        >
          kxlaa
        </Link>
        <nav className="flex gap-4">
          <Link href="/about">Twitter</Link>
          <Link href="/work">Linkedin</Link>
          <Link href="/posts">Email</Link>
        </nav>
      </header>
      <main className="flex flex-col gap-24 px-10 py-16">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-bold text-7xl">Kolade Afode</h1>
          <h2 className="text-3xl !text-blue-500 font-medium">
            Engineer / Designer
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold">Recent Posts</h3>
          {posts.map((post) => (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className="text-[40px] font-light hover:underline underline-offset-4 decoration-blue-500"
            >
              {post.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold">Projects</h3>
          <a
            href={`https://www.nartefacts.com/`}
            className="text-[40px] font-light hover:underline"
          >
            Nartefacts
          </a>
          <a
            href={`https://www.devportfolios.dev/`}
            className="text-[40px] font-light hover:underline"
          >
            DevPortfolios
          </a>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
  );

  return {
    props: { posts },
  };
};
