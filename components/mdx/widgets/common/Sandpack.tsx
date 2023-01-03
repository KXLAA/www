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
  //   UnstyledOpenInCodeSandboxButton,
} from "@codesandbox/sandpack-react";
import { CopyIcon } from "@radix-ui/react-icons";
// import {
//   Disclosure,
//   DisclosureContent,
//   useDisclosureState,
// } from "ariakit/disclosure";
import React from "react";

type SandpackProps = {
  id: string;
  files: SandpackFiles;
  customSetup?: SandpackSetup;
  providerProps?: SandpackProviderProps;
};

export default function Sandpack(props: SandpackProps) {
  const [open, setOpen] = React.useState(false);
  const { id, files, customSetup, providerProps } = props;

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
          },
          ...providerProps,
        }}
        customSetup={customSetup}
      >
        <SandpackLayout>
          <SandpackPreview />
          <span className="flex items-center justify-between w-full p-3 bg-shark-800 text-silver">
            <button className="w-full text-left" onClick={() => setOpen(!open)}>
              Code Editor
            </button>
            <div className="flex gap-3">
              <RefreshButton />
              <OpenInCodeSandboxButton />
              <CopyIcon />
            </div>
          </span>
          {open && (
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              closableTabs
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
