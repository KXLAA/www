"use client";

import copy from "copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import React from "react";

import { cx } from "@/lib/cx";

export function Pre(props: any) {
  const [code, setCode] = React.useState("");
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) setTimeout(() => setHasCopied(false), 1500);
  }, [hasCopied]);

  const getCodeString = (node: HTMLPreElement | null) => {
    if (node) {
      const codeElement = node.querySelector("code");
      const codeString = codeElement?.innerText.replace(/\n{2}/g, "\n") ?? "";
      setCode(codeString);
    }
  };

  return (
    <div className="relative group">
      <pre
        ref={(node) => getCodeString(node)}
        className="p-6 bg-gray-2 border-gray-6 border text-lg overflow-scroll !rounded-none !font-normal"
        {...props}
      />

      <button
        aria-label="Copy code to clipboard"
        onClick={() => {
          copy(code);
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
    </div>
  );
}
