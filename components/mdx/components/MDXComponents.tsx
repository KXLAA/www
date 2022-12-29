import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import copy from "copy-to-clipboard";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

// function H2({ children }: any) {
//   const id = children[1].toLowerCase().replace(/ /g, "-");
//   return <h2 id={id}>{children}</h2>;
// }

// function Code({ children }: any) {
//   return (
//     <code className="px-1 py-0.5 rounded-md bg-shark-900 text-silver-600 font-normal shadow-border-shiny">
//       {children}
//     </code>
//   );
// }
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

function CopyCodeButton({ code, ...props }: any) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) setTimeout(() => setHasCopied(false), 1500);
  }, [hasCopied]);

  return (
    <button
      aria-label="Copy code to clipboard"
      onClick={() => {
        copy(code);
        setHasCopied(true);
      }}
      {...props}
      className="absolute inline-flex transition-all opacity-0 top-5 right-5 hover:opacity-100 focus:opacity-100"
    >
      {hasCopied ? (
        <CheckIcon className="w-5 h-5" />
      ) : (
        <ClipboardIcon className="w-5 h-5" />
      )}
    </button>
  );
}

function Pre(props: any) {
  const [code, setCode] = React.useState<string | undefined>("");

  return (
    <div className="relative">
      <pre
        ref={(node) => {
          if (node) {
            // remove double line breaks
            const codeElement = node.querySelector("code");
            const code = codeElement?.innerText.replace(/\n{2}/g, "\n");
            setCode(code);
          }
        }}
        className="py-4 m-0 rounded-xl bg-[#2C2C2C]"
        {...props}
      />

      <CopyCodeButton code={code} />
    </div>
  );
}

export const components = { a: A, pre: Pre, Image };
