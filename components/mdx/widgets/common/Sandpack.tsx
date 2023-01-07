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

// TODO: Animate height of code editor on toggle
// TODO: Persist code editor state in local storage

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
          <AnimateHeight isVisible={open}>
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
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

const baseCss = `
:root {
  --shark-50: #53535a;
  --shark-100: #4e4e54;
  --shark-200: #44444a;
  --shark-300: #3b3b3f;
  --shark-400: #313135;
  --shark-500: #27272a;
  --shark-600: #202022;
  --shark-700: #18181a;
  --shark-800: #111112;
  --shark-900: #0a0a0a;

  --silver-50: #eeeeee;
  --silver-100: #e9e9e9;
  --silver-200: #dfdfdf;
  --silver-300: #d4d4d4;
  --silver-400: #cacaca;
  --silver-500: #c0c0c0;
  --silver-600: #a4a4a4;
  --silver-700: #888888;
  --silver-800: #6c6c6c;
  --silver-900: #505050;

  --background-image: radial-gradient(rgb(31, 31, 31) 11.6%, transparent 11.6%),
    radial-gradient(rgb(31, 31, 31) 11.6%, transparent 11.6%);
  --background: rgb(18, 18, 18);
  --shadow-border-shiny: inset 0 0 0 1px hsl(0deg 0% 100% / 10%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  font-family: poppins, sans-serif;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
}

html,
body {
  height: 100%;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#root,
#__next {
  isolation: isolate;
}

#root {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

body {
  margin: 0;
  padding: 0;
  background-image: var(--background-image);
  background-color: var(--background);
  background-position: 0px 0px, 16px 16px;
  background-size: 16px 16px;
  padding: 3rem;
  line-height: 1.5;
  color: var(--silver-500);
}
`;

export function styles(styles: string) {
  return baseCss.trim() + styles.trim();
}

// function trimCode(obj: SandpackFiles) {
//   //remove white space in objects values
//   const newObj: SandpackFiles = {};
//   for (const key in obj) {
//     const file = obj[key];
//     //check if file is a string
//     if (typeof file === "string") {
//       newObj[key] = file.trim();
//     }
//     //check if file is an object
//     if (typeof file === "object") {
//       newObj[key] = {
//         ...file,
//         code: file.code.trim(),
//       };
//     }

//     return newObj;
//   }
// }
