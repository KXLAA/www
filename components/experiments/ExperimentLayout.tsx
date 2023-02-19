import copy from "copy-to-clipboard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SiCodesandbox } from "react-icons/si";
import { TfiLink } from "react-icons/tfi";

import { Layout } from "@/components/common/Layout";
import { Show } from "@/components/common/Show";
import { Tooltip } from "@/components/common/Tooltip";
import type { Experiments as ExperimentsType } from "@/contentlayer/generated";
import { api } from "@/lib/api";
import { cx } from "@/lib/cx";
import { formatDate } from "@/lib/date";
import { getBaseUrl } from "@/lib/get-base-url";
import type { MetaProps } from "@/lib/seo";

type ExperimentLayoutProps = ExperimentsType & {
  children: React.ReactNode;
  customMeta?: MetaProps;
};

export function ExperimentLayout(props: ExperimentLayoutProps) {
  const { children, title, slug, customMeta, codesandbox, publishedAt } = props;
  const publishedExperiments = api.getPublishedExperiments();
  const current = publishedExperiments.findIndex((p) => p.slug === slug);
  const next = publishedExperiments[current + 1];
  const prev = publishedExperiments[current - 1];

  return (
    <Layout
      className="flex flex-col items-center justify-center max-w-5xl gap-4 px-4 py-4 mx-auto text-base md:px-10 md:py-16 md:gap-8 md:text-xl font-extralight"
      customMeta={customMeta}
    >
      <Link
        href={publishedExperiments.length > 1 ? "/experiments" : "/"}
        className="flex items-center self-start gap-1 px-2 py-1 text-xs font-normal transition-all border border-transparent rounded bg-cod-gray-500 hover:border-cod-gray-400 w-fit"
      >
        <ArrowLeft className="w-3 h-3 text-silver-700" />
        {publishedExperiments.length > 1 ? "Experiments" : "Home"}
      </Link>

      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-base font-normal text-silver-600">{title}</h1>
          <p className="text-sm text-silver-800">
            {formatDate(publishedAt, "MMMM dd, yyyy")}
          </p>
        </div>

        <div className="flex gap-2">
          <AnchorLink
            icon={<TfiLink className="w-4 h-4" />}
            tooltipMessage="Copy Link"
            onClick={() => copy(`${getBaseUrl()}/experiments/${slug}`)}
          />
          <Show when={!!codesandbox}>
            <AnchorLink
              icon={<SiCodesandbox className="w-4 h-4" />}
              tooltipMessage="View on Codesandbox"
              href={codesandbox}
            />
          </Show>
        </div>
      </div>

      <div className="w-full p-8 border border-dashed rounded-lg border-shark-600 grid-bg bg-cod-gray-800">
        {children}
      </div>

      <Show when={!!prev && !!next}>
        <div
          className={cx(
            "flex w-full gap-4 text-sm font-medium border-t border-dashed text-silver-900 border-shark-600 py-10 ",
            prev ? "justify-between " : "justify-end"
          )}
        >
          <Show when={!!prev}>
            <Navigation experiment={prev} label="Previous" />
          </Show>

          <Show when={!!next}>
            <Navigation experiment={next} label="Next" className="text-right" />
          </Show>
        </div>
      </Show>
    </Layout>
  );
}

type AnchorLinkProps = {
  href?: string;
  icon: JSX.Element;
  className?: string;
  onClick?: () => void;
  tooltipMessage?: string;
};

function AnchorLink(props: AnchorLinkProps) {
  const { icon, className, href, onClick, tooltipMessage } = props;
  const Element = props.href ? "a" : "button";

  return (
    <Tooltip content={tooltipMessage}>
      <Element
        href={href}
        onClick={onClick}
        className={cx(
          "flex items-center justify-center w-8 h-8 transition border rounded-full text-silver-800 bg-shark-700 border-shark-600 hover:bg-shark-500 hover:order-shark-400 hover:text-silver-500",
          className
        )}
      >
        {icon}
      </Element>
    </Tooltip>
  );
}

type NavigationProps = {
  experiment?: ExperimentsType;
  className?: string;
  label?: string;
};

function Navigation(props: NavigationProps) {
  const { experiment, className, label } = props;
  return (
    <Link
      href={experiment!.slug}
      className={cx("flex flex-col gap-1 text-sm", className)}
    >
      <span className="font-normal">{label}</span>
      <span className="font-extralight text-silver-700">
        {experiment?.title}
      </span>
    </Link>
  );
}
