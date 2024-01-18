"use client";

import * as Tabs from "@radix-ui/react-tabs";
import Refractor from "react-refractor";
import bash from "refractor/lang/bash";
import hcl from "refractor/lang/hcl";
import tsx from "refractor/lang/tsx";
import ts from "refractor/lang/typescript";

import { cx } from "@/lib/cx";

Refractor.registerLanguage(ts);
Refractor.registerLanguage(tsx);
Refractor.registerLanguage(bash);
Refractor.registerLanguage(hcl);

type CodeTab = {
  name: string;
  code: string;
  language: string;
  closable?: boolean;
};

type CodeTabsProps = {
  tabs: Array<CodeTab>;
};

export function CodeTabs({ tabs }: CodeTabsProps) {
  return (
    <Tabs.Root className="bg-gray-2 border-gray-6 border">
      <Tabs.List className="border-b border-gray-6">
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.name}
            value={tab.name}
            className="border-r border-gray-6 p-2 bg-gray-2 px-4 font-mono text-base font-semibold data-[state=active]:bg-gray-3 data-[state=active]:text-orange-10 "
          >
            {tab.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content value={tab.name} key={tab.name}>
          <Refractor
            className={cx(
              "!rounded-none text-sm !bg-transparent !text-gray-11 !m-0 !p-0"
            )}
            value={tab.code}
            language="hcl"
          />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

const languages = [
  {
    lang: "ts",
    icon: <></>,
  },
  {
    lang: "tf",
    icon: <></>,
  },
  {
    lang: "tf",
    icon: <></>,
  },
];
