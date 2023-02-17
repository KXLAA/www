import type { DefaultSeoProps, NextSeoProps } from "next-seo";

export type MetaProps = NextSeoProps;

export const seo: DefaultSeoProps = {
  title: `Kola | Full Stack Engineer`,
  description: `Do it with flair ✨`,
  openGraph: {
    title: `Kola | Full Stack Engineer`,
    type: "website",
    url: `https://kxlaa.com`,
    images: [
      {
        url: "https://ucarecdn.com/2fecb5b1-ed81-47b7-917d-b5c70f3ed733/mainogimage.jpg",
        width: 1200,
        height: 600,
        alt: `Kola | Full Stack Engineer`,
      },
    ],
  },
};
