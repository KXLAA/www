import type { DefaultSeoProps, NextSeoProps } from "next-seo";

export type MetaProps = NextSeoProps;

export const seo: DefaultSeoProps = {
  title: `Kola | Full Stack Engineer`,
  description: `Do it with flair ✨`,
  openGraph: {
    title: `Kola | Full Stack Engineer`,
    type: "website",
    url: `https://kxlaa.com`,
    site_name: `Kola | Full Stack Engineer`,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `Kola | Full Stack Engineer`,
      },
    ],
  },
  twitter: {
    handle: `@kxlaa_`,
    cardType: "summary_large_image",
  },
};
