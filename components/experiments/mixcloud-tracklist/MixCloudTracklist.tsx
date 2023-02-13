import { XCircle } from "lucide-react";
import React from "react";
import type { UseFormRegister } from "react-hook-form";

import { Show } from "@/components/common/Show";
import { Tooltip } from "@/components/common/Tooltip";
import { cx } from "@/lib/cx";
import { useHover } from "@/lib/hooks/use-hover";

import type { Track } from "./controller";
import { useController } from "./controller";

export default function MixCloudTrackList() {
  const {
    register,
    onPaste,
    pasted,
    fields,
    convert,
    onRemove,
    toggleTitleAndArtist,
    resetPasted,
    pastedMessage,
    hidePastedMessage,
    handleChange,
    onAdd,
  } = useController();
  return (
    <div>
      <Show when={pastedMessage}>
        <PastedMessage
          toggleTitleAndArtist={toggleTitleAndArtist}
          resetPasted={resetPasted}
          hidePastedMessage={hidePastedMessage}
        />
      </Show>

      <Show when={pasted}>
        <div className="grid grid-cols-12 gap-0.5">
          <div className="p-4 text-xs font-medium text-silver-700 bg-cod-gray-500">
            #
          </div>
          <div className="flex items-center justify-center col-span-4 p-3 text-xs font-medium text-silver-700 bg-cod-gray-500">
            Artist
          </div>
          <div className="flex items-center justify-center col-span-4 p-3 text-xs font-medium text-silver-700 bg-cod-gray-500">
            Track Name
          </div>
          <div className="flex items-center justify-center col-span-3 p-3 text-xs font-medium text-silver-700 bg-cod-gray-500">
            Start time
          </div>
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <div className="p-4 text-xs text-silver-500 bg-cod-gray-500">
                {index + 1}
              </div>
              <input
                className={cx(
                  "flex items-center justify-center col-span-4 p-3 text-xs text-silver-500 bg-cod-gray-400 focus:text-silver-200 focus:bg-cod-gray-200 focus:outline-none hover:bg-cod-gray-200",
                  field?.chapter ? "col-span-8" : "col-span-4"
                )}
                {...register(`tracklist.${index}.artist` as const)}
                placeholder={field?.chapter ? "Chapter name" : "Artist name"}
              />
              <input
                className={cx(
                  "flex items-center justify-center col-span-4 p-3 text-xs text-silver-500 bg-cod-gray-400 focus:text-silver-200 focus:bg-cod-gray-200 focus:outline-none hover:bg-cod-gray-200",
                  field?.chapter && "hidden"
                )}
                {...register(`tracklist.${index}.trackName` as const)}
                placeholder="Track name"
              />

              <StartTime
                register={register}
                field={field}
                index={index}
                convert={convert}
                onRemove={onRemove}
              />
            </React.Fragment>
          ))}
        </div>
      </Show>
      <Show when={!pasted}>
        <TextArea
          placeholder="Paste a tracklist here or start typing an artist name"
          onPaste={onPaste}
          onChange={handleChange}
        />
      </Show>

      <Show when={pasted}>
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={onAdd.newTrack}
            className={cx(
              "transition relative flex text-xs items-center justify-center px-2 w-fit py-1 rounded text-silver-600 bg-cod-gray-600 border border-cod-gray-400",
              "hover:bg-cod-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cod-gray-800 focus-visible:ring-cod-gray-500"
            )}
          >
            Add a new track row at the end
          </button>
          <button
            onClick={onAdd.newChapter}
            className={cx(
              "transition relative flex text-xs items-center justify-center px-2 w-fit py-1 rounded text-silver-600 bg-cod-gray-600 border border-cod-gray-400",
              "hover:bg-cod-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cod-gray-800 focus-visible:ring-cod-gray-500"
            )}
          >
            Add a new chapter row at the end
          </button>

          <button
            onClick={toggleTitleAndArtist}
            className={cx(
              "transition relative flex text-xs items-center justify-center px-2 w-fit py-1 rounded text-silver-600 bg-cod-gray-600 border border-cod-gray-400",
              "hover:bg-cod-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cod-gray-800 focus-visible:ring-cod-gray-500"
            )}
          >
            Swap Artist and Track columns
          </button>
        </div>
      </Show>
    </div>
  );
}

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      className="w-full px-2 py-1.5 text-xs rounded text-silver-500 placeholder:text-silver-900 bg-cod-gray-800 border border-cod-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cod-gray-800 focus:ring-cod-gray-500 transition self-start resize-none h-40 placeholder:text-center block placeholder:relative placeholder:top-2/4  placeholder:-translate-y-2/4 placeholder:font-medium"
      ref={ref}
      {...props}
    />
  );
});

type StartTimeProps = {
  index: number;
  register: UseFormRegister<{
    tracklist: Track[];
    artist: string;
  }>;
  field: Track;
  convert: {
    toTrack: (index: number, field: Track) => void;
    toChapter: (index: number, field: Track) => void;
  };
  onRemove: (index: number) => void;
};

function StartTime(props: StartTimeProps) {
  const { index, register, field, convert, onRemove } = props;
  const [ref, isHover] = useHover<HTMLDivElement | null>();

  return (
    <div
      className="flex items-center justify-center col-span-3 gap-2 text-xs text-silver-500 bg-cod-gray-400 hover:bg-cod-gray-200"
      ref={ref}
    >
      <input
        className="flex items-center justify-center w-full h-full col-span-3 p-3 text-xs bg-transparent text-silver-500 bg-cod-gray-700 focus:text-silver-200 focus:bg-cod-gray-200 focus:outline-none hover:bg-cod-gray-200"
        {...register(`tracklist.${index}.startTime` as const)}
        placeholder="0.00"
        readOnly
      />

      <Show when={isHover}>
        <div className="flex items-center justify-center gap-1 pr-2">
          {field?.chapter ? (
            <Tooltip content="Convert to Track">
              <button
                onClick={() => convert.toTrack(index, field)}
                className="w-6 h-6 transition rounded aspect-square bg-cod-gray-600 hover:bg-cod-gray-500"
              >
                T
              </button>
            </Tooltip>
          ) : (
            <Tooltip content="Convert to Chapter">
              <button
                onClick={() => convert.toChapter(index, field)}
                className="w-6 h-6 transition rounded aspect-square bg-cod-gray-600 hover:bg-cod-gray-500"
              >
                C
              </button>
            </Tooltip>
          )}
          <Tooltip content="Remove">
            <button
              onClick={() => onRemove(index)}
              className="w-6 h-6 transition rounded aspect-square bg-cod-gray-600 hover:bg-cod-gray-500"
            >
              R
            </button>
          </Tooltip>
        </div>
      </Show>
    </div>
  );
}

function PastedMessage({
  toggleTitleAndArtist,
  resetPasted,
  hidePastedMessage,
}: {
  toggleTitleAndArtist: () => void;
  resetPasted: () => void;
  hidePastedMessage: () => void;
}) {
  return (
    <div className="flex items-start justify-center max-w-lg gap-4 mx-auto">
      <div className="h-full mb-8 text-xs text-center text-silver-500">
        It looks like you just pasted a tracklist - we could have possibly put
        the Title & Artist the wrong way round, please check below &{" "}
        <button
          className="inline font-normal underline"
          onClick={toggleTitleAndArtist}
        >
          click here
        </button>{" "}
        to switch them.{" "}
        <button className="inline font-normal underline" onClick={resetPasted}>
          Undo
        </button>
      </div>
      <button onClick={hidePastedMessage}>
        <XCircle className="w-3 h-3 text-silver-700" />
      </button>
    </div>
  );
}
