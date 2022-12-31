import { Sandpack } from "@codesandbox/sandpack-react";

const code = `export default function App() {
    return <h1>Hello Sandpack</h1>
  }`;
export default function FreeDnDSandPack() {
  return (
    <div id="free-dnd-sandpack">
      <Sandpack
        template="react-ts"
        theme="dark"
        options={{
          showLineNumbers: true,
          showTabs: true,
          // showNavigator: true,
          // readOnly: true,
        }}
        files={{
          "/App.tsx": code,
          "/Draggable.tsx": code,
          "/Droppable.tsx": code,
        }}
      />
    </div>
  );
}
