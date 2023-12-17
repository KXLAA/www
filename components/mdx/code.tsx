"use client";

import React from "react";
import { highlight } from "sugar-high";

type CodeProps = {
  children: string;
};

export function Code({ children, ...props }: CodeProps) {
  //Don't apply syntax highlighting to code blocks that are not in a pre tag
  const getCodeString = (codeElement: HTMLElement | null) => {
    if (codeElement) {
      const parent = codeElement.parentElement;
      if (
        parent?.tagName === "PRE" &&
        codeElement.className.includes("language-")
      ) {
        const codeHTML = highlight(children);
        codeElement.innerHTML = codeHTML;
      }
    }
  };

  return (
    <code
      ref={(node) => getCodeString(node)}
      className="!font-normal font-mono"
      {...props}
    >
      {children}
    </code>
  );
}
