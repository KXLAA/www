import { Import, MinusCircle, PlusCircle } from "lucide-react";
import React from "react";

import { Show } from "@/components/common/Show";
import { cx } from "@/lib/cx";

import { useVercelEnvInputs } from "./controller";

export default function VercelEnvInputs() {
  const controller = useVercelEnvInputs();

  return (
    <div className="flex flex-col w-full gap-3 border rounded-lg shadow-lg bg-cod-gray-900 border-cod-gray-400">
      <div className="flex flex-col w-full gap-3 p-4">
        <div className="grid grid-cols-2 text-xs text-silver-700">
          <span>Key</span>
          <span>Value</span>
        </div>

        <ul className="flex flex-col gap-2">
          {controller.fields.map((item, index) => (
            <li key={item.id} className="flex justify-between gap-2">
              <Input
                {...controller.register(`env.${index}.envKey`)}
                type="text"
                placeholder="e.g CLIENT_KEY"
                onPaste={(e) => controller.onPaste(e, index)}
              />
              <Input
                {...controller.register(`env.${index}.value`)}
                placeholder="Value"
              />
              <button type="button" onClick={() => controller.onDelete(index)}>
                <MinusCircle className="w-4 h-4 text-cod-gray-100 hover:text-cod-gray-50" />
              </button>
            </li>
          ))}
        </ul>

        <button
          className={cx(
            "transition relative flex text-xs items-center justify-center px-2 w-fit py-1 rounded text-silver-600 bg-cod-gray-600 border border-cod-gray-400",
            "hover:bg-cod-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cod-gray-800 focus-visible:ring-cod-gray-500"
          )}
          onClick={controller.onAdd}
        >
          Add Another <PlusCircle className="w-3 h-3 ml-2 text-silver-900" />
        </button>
      </div>
      <div className="flex items-center justify-between gap-4 p-4 border-t border-cod-gray-500">
        <div className="flex items-center justify-between gap-4 ">
          <button
            className={cx(
              "transition relative flex text-xs items-center justify-center px-2 w-fit py-1 rounded text-silver-600 bg-cod-gray-600 border border-cod-gray-400",
              "hover:bg-cod-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cod-gray-800 focus-visible:ring-cod-gray-500 cursor-pointer"
            )}
          >
            Import <Import className="w-3 h-3 ml-2 text-silver-900" />
            <input
              type="file"
              className={cx(
                "absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-0 cursor-pointer focus:outline-none"
              )}
              accept=".txt"
              onChange={controller.onImport}
            />
          </button>
          <span className="text-xs text-silver-900">
            <span className="font-medium">TIP</span>: Paste a .env above to
            populate the form
          </span>
        </div>

        <Show when={!!controller.error}>
          <div className="flex items-center self-end gap-4 py-0.5 px-2 text-xs border border-t rounded-full border-red-dark-4 bg-red-dark-2 text-red-dark-11">
            {controller.error}
          </div>
        </Show>
      </div>
    </div>
  );
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      className="w-full px-2 py-1.5 text-xs rounded text-silver-500 placeholder:text-silver-900 bg-cod-gray-800 border border-cod-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cod-gray-800 focus:ring-cod-gray-500 transition self-start"
      ref={ref}
      {...props}
    />
  );
});
