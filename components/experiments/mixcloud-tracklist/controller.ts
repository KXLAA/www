import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

export type Track = {
  artist: string;
  trackName: string;
  chapter: boolean;
  startTime?: string;
};

export function useController() {
  const [pasted, setPasted] = React.useState(false);
  const [pastedMessage, setPastedMessage] = React.useState(false);
  const { register, control, watch } = useForm<{
    tracklist: Track[];
    artist: string;
  }>();
  const { fields, append, remove, update, replace } = useFieldArray({
    control,
    name: "tracklist",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if (value.length > 0) {
      setPasted(true);
      append({
        artist: value,
        trackName: "",
        chapter: false,
      });
    }
  };

  const firstField = watch(`tracklist.0`);
  React.useEffect(() => {
    if (fields.length > 0) {
      setPasted(true);
    }

    if (firstField?.artist.length === 0 && firstField?.trackName.length <= 0) {
      setPasted(false);
      remove(0);
    }
  }, [fields.length, firstField?.artist.length, firstField?.trackName.length]);

  const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("Text");
    setPasted(true);
    setPastedMessage(true);
    const tracklist = parse(text);
    append(tracklist);
  };

  const convertToTrack = (index: number, track: Track) => {
    return update(index, {
      ...track,
      trackName: "",
      chapter: false,
    });
  };

  const convertToChapter = (index: number, track: Track) => {
    return update(index, {
      ...track,
      chapter: true,
    });
  };

  const onRemove = (index: number) => {
    remove(index);
  };

  const toggleTitleAndArtist = () => {
    const newTracklist = fields.map((track) => {
      return {
        ...track,
        artist: track.trackName,
        trackName: track.artist,
      };
    });

    console.log(newTracklist);

    replace(newTracklist);
  };

  const resetPasted = () => {
    setPastedMessage(false);
    setPasted(false);
    replace([]); // reset tracklist
  };

  const hidePastedMessage = () => {
    setPastedMessage(false);
  };

  const onAddNewTrack = () => {
    append({
      artist: "",
      trackName: "",
      chapter: false,
    });
  };

  const onAddNewChapter = () => {
    append({
      artist: "",
      trackName: "",
      chapter: true,
    });
  };

  return {
    onPaste,
    fields,
    register,
    pasted,
    convert: {
      toTrack: convertToTrack,
      toChapter: convertToChapter,
    },
    onRemove,
    toggleTitleAndArtist,
    resetPasted,
    pastedMessage,
    hidePastedMessage,
    handleChange,
    onAdd: {
      newTrack: onAddNewTrack,
      newChapter: onAddNewChapter,
    },
  };
}

function parse(text: string) {
  //remove empty duplicated new lines
  const lines = text.replace(/\n\n+/g, "\n");

  const tracklist = lines.split("\n").map((line) => {
    const [artist, trackName] = line.split(" - ");
    const artistWithoutNumbers = artist.replace(/^\d+\.\s*/, "");

    return {
      artist: artistWithoutNumbers,
      trackName,
      chapter: trackName ? false : true,
    };
  });

  return tracklist;
}
