import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import copy from "copy-to-clipboard";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

import { Callout } from "@/components/common/Callout";
import { cx } from "@/lib/cx";
import { useHover } from "@/lib/hooks/use-hover";

function A({ href, ...props }: any) {
  if (href.startsWith("http")) {
    return (
      <a
        {...props}
        href={href}
        styles={{ fontSize: "inherit" }}
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  }
  return <NextLink href={href} {...props}></NextLink>;
}

function Pre(props: any) {
  const [hoverRef, isHovered] = useHover();
  const [code, setCode] = React.useState<string | undefined>("");
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) setTimeout(() => setHasCopied(false), 1500);
  }, [hasCopied]);

  const getCodeString = (node: HTMLPreElement | null) => {
    if (node) {
      // remove double line breaks
      const codeElement = node.querySelector("code");
      const codeString = codeElement?.innerText.replace(/\n{2}/g, "\n");
      setCode(codeString);
    }
  };

  return (
    <div className="relative" ref={hoverRef as any}>
      <pre
        ref={(node) => getCodeString(node)}
        className="py-4 m-0 rounded-xl bg-shark-800"
        {...props}
      />

      <button
        aria-label="Copy code to clipboard"
        onClick={() => {
          copy(code!);
          setHasCopied(true);
        }}
        {...props}
        className={cx(
          "absolute inline-flex transition-opacity duration-200 opacity-0 top-5 right-5 hover:opacity-100 rounded-md hover:bg-shark-700 hover:transition-colors p-1.5 ",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        {hasCopied ? (
          <CheckIcon className="w-4 h-4 text-silver-600" />
        ) : (
          <CopyIcon className="w-4 h-4 text-silver-600" />
        )}
      </button>
    </div>
  );
}

export const components = { a: A, pre: Pre, Image, Callout };
