import NextHead from "next/head";
import { useRouter } from "next/router";

import { WEBSITE_HOST_URL } from "@/lib/constants";
import type { MetaProps } from "@/types/layout";

type HeadProps = {
  customMeta?: MetaProps;
};

export function Head(props: HeadProps) {
  const { customMeta } = props;
  const router = useRouter();
  const meta: MetaProps = {
    title: "Kolade Afode",
    description:
      "Sleep Deprived Father. Senior Web Developer. Lover of all things Ramen and Kpop.",
    thumbnail: `${WEBSITE_HOST_URL}/images/site-preview.png`,
    type: "website",
    ...customMeta,
  };

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <link rel="canonical" href={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Hunter Chang - Website" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.thumbnail} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@huntarosan" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.thumbnail} />
      {meta.date && (
        <meta property="article:published_time" content={meta.date} />
      )}
    </NextHead>
  );
}
