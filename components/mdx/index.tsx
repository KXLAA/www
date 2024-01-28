import Image from "next/image";
import React from "react";

import { Callout } from "./callout";
import { Code } from "./code";
import { Pre } from "./pre";
import { Anchor, Link } from "../anchor";

function NextImage(props: any) {
  return <Image alt={props.alt} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    let slug = slugify(children);

    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `h${level}`;

  return Heading;
}

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <Anchor {...props} />;
  }

  return <Anchor target="_blank" rel="noopener noreferrer" {...props} />;
}

type GIFProps = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
> & {
  title?: string;
};

function GIF({ title, ...props }: GIFProps) {
  return (
    <div className="border border-gray-6 ">
      <div className="border-b border-gray-6 p-2 font-mono text-base bg-gray-2">
        {title}
      </div>
      <div className="p-1">
        <video autoPlay loop muted playsInline {...props} className="m-0" />
      </div>
    </div>
  );
}

export const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  code: Code,
  a: CustomLink,
  pre: Pre,
  Callout,
  Image: NextImage,
  GIF,
} as any;
