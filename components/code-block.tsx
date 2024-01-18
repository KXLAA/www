"use client";

import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import React from "react";

import { cx } from "@/lib/cx";

import {
  SyntaxHighlighter,
  type SyntaxHighlightProps,
} from "./syntax-highlighter";

type CodeBlockProps = SyntaxHighlightProps & {
  className?: string;
  value: string;
};

export default function CodeBlock({ className, ...props }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = React.useState(false);
  React.useEffect(() => {
    if (hasCopied) setTimeout(() => setHasCopied(false), 1500);
  }, [hasCopied]);

  return (
    <div className="relative group bg-gray-2 p-4 border border-gray-6">
      <button
        aria-label="Copy code to clipboard"
        onClick={() => {
          copy(props.value);
          setHasCopied(true);
        }}
        {...props}
        className={cx(
          "absolute inline-flex transition-opacity duration-150 rounded-none top-5 right-5 hover:opacity-100  hover:bg-gray-5 hover:transition-colors p-1.5 opacity-0 group-hover:opacity-100",
          "[&_svg]:w-5 [&_svg]:h-5 [&_svg]:text-gray-11 border border-transparent hover:border-gray-6"
        )}
      >
        {hasCopied ? <Check /> : <Copy />}
      </button>
      <SyntaxHighlighter className={className} {...props} />
    </div>
  );
}
