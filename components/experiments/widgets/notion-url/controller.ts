import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

type Block = {
  id: string;
  content: string;
  values: {
    start: number;
    end: number;
    tokens: string[];
    type: string;
  };
};

export function useNotionUrl() {
  const [hoverCardState, setHoverCardState] = React.useState(false);
  const [popoverState, setPopoverState] = React.useState(false);
  const { register, control } = useForm<{
    blocks: Block[];
  }>({});

  const { fields, append, remove, update, insert } = useFieldArray({
    control,
    name: "blocks",
  });

  return {};
}

function useSelectedText() {
  const [text, setText] = React.useState("");
  const [selected, setSelected] = React.useState(false);

  const select = () => {
    const selected = window.getSelection() as Selection;
    setText(selected.toString());

    if (selected.toString().length > 0) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  return [select, text] as const;
}
