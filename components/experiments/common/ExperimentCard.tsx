import Link from "next/link";

import type { Experiments as ExperimentsType } from "@/contentlayer/generated";

type ExperimentCardProps = ExperimentsType & {
  size?: "sm" | "md";
};

export function ExperimentCard(props: ExperimentCardProps) {
  const { heading, slug, webm, mp4 } = props;
  return (
    <Link
      href={`/experiments/${slug}`}
      className="relative flex flex-col gap-1.5 overflow-hidden transition-colors border rounded-md border-cod-gray-400 bg-cod-gray-500"
    >
      <div className="flex flex-col p-1.5 pb-0">
        <video
          loop
          muted
          className="rounded rounded-b-0"
          onMouseOver={(e) => e.currentTarget.play()}
          onMouseOut={(e) => e.currentTarget.pause()}
          playsInline
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      </div>
      <div className="flex justify-between w-full px-3 py-1 text-base font-normal bg-cod-gray-600">
        <div className="flex flex-col">
          <span>{heading}</span>
          <span className="text-sm text-silver-700">2022</span>
        </div>
      </div>
    </Link>
  );
}
