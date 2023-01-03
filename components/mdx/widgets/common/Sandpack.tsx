import type {
  SandpackFiles,
  SandpackProviderProps,
  SandpackSetup,
} from "@codesandbox/sandpack-react";
import {
  OpenInCodeSandboxButton,
  RefreshButton,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import React from "react";

import { AnimateHeight } from "@/components/animation/AnimateHeight";

type SandpackProps = {
  id: string;
  files: SandpackFiles;
  customSetup?: SandpackSetup;
  providerProps?: SandpackProviderProps;
};

export default function Sandpack(props: SandpackProps) {
  //hydration issues with framer-motion
  const [open, setOpen] = React.useState(false);
  const { id, files, customSetup, providerProps } = props;

  const variants = {
    open: {
      opacity: 1,
      height: "auto",
      x: 0,
    },
    collapsed: { opacity: 0, height: 0, x: 0 },
  };

  return (
    <div id={id}>
      <SandpackProvider
        template="react-ts"
        theme="dark"
        files={files}
        options={{
          externalResources: [
            "https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css",
          ],
          classes: {
            "sp-preview-actions": "hidden",
            "sp-layout": "rounded-md",
          },
          ...providerProps,
        }}
        customSetup={customSetup}
      >
        <SandpackLayout>
          <SandpackPreview />
          <span className="flex items-center justify-between w-full p-3 bg-shark-800 text-silver">
            <button
              className="w-full text-sm font-semibold text-left transition-colors text-silver-800 hover:text-silver-600"
              onClick={() => setOpen(!open)}
              title="Open Code Editor"
              aria-label="Open Code Editor"
            >
              Code Editor
            </button>
            <div className="flex gap-3">
              <RefreshButton />
              <OpenInCodeSandboxButton />
            </div>
          </span>
          <AnimateHeight variants={variants} isVisible={open}>
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              closableTabs
              style={{
                height: "300px",
                width: "100%",
                overflow: "hidden",
                background: "none",
              }}
            />
          </AnimateHeight>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
