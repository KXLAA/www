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
        url: "/images/main-og-image.jpg",
        width: 1200,
        height: 600,
        alt: `Kola | Full Stack Engineer`,
      },
    ],
  },
  twitter: {
    handle: `@kxlaa_`,
    site: `@kxlaa_`,
    cardType: "summary_large_image",
  },
};
