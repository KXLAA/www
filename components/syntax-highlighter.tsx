"use client";

import React from "react";
import Refractor from "react-refractor";
import bash from "refractor/lang/bash";
import hcl from "refractor/lang/hcl";
import json from "refractor/lang/json";
import tsx from "refractor/lang/tsx";
import ts from "refractor/lang/typescript";

import { cx } from "@/lib/cx";

Refractor.registerLanguage(ts);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(bash);
Refractor.registerLanguage(hcl);
Refractor.registerLanguage(json);

export type SyntaxHighlightProps = React.ComponentPropsWithoutRef<
  typeof Refractor
> & {
  className?: string;
  value: string;
};

export function SyntaxHighlighter({
  className,
  ...props
}: SyntaxHighlightProps) {
  const value = props.value.trim();
  return (
    <Refractor
      {...props}
      className={cx(
        "!rounded-none text-base !bg-transparent !text-gray-11 !m-0 !p-0",
        className
      )}
      value={value}
    />
  );
}
