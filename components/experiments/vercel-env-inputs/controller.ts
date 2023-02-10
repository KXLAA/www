import copy from "copy-to-clipboard";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const env = {
  envKey: "",
  value: "",
};

export function useController() {
  const [error, setError] = React.useState<string | undefined>(undefined);
  const { register, control } = useForm({
    defaultValues: {
      env: [env],
    },
  });
  const { fields, append, remove, update, insert } = useFieldArray({
    control,
    name: "env",
  });

  const onImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result?.toString();
        const envs = parse(text!);
        if (envs) {
          append(envs);
        }
      };
      reader.readAsText(file);
    } else {
      setError("File not supported!");
      return;
    }
  };

  const onPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const text = e.clipboardData.getData("Text");
    const envs = parse(text);

    const first = envs[0];
    const rest = envs.slice(1);
    update(index, first);
    insert(index, rest);
  };

  const onDelete = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      update(index, env);
    }
  };

  const onCopyLink = (link: string) => {
    copy(link);
  };

  return {
    register,
    onDelete,
    update,
    onPaste,
    onAdd: () => append(env),
    fields,
    env,
    onImport,
    error,
    onCopyLink,
  };
}

function parse(src: string) {
  return (
    src
      ?.split(/(\r\n|\n|\r)/gm)
      //remove new lines
      ?.map((item: string) => item.replace(/(\r\n|\n|\r)/gm, ""))
      //remove empty items
      ?.filter((item: string) => item !== "")
      ?.map((item: string) => {
        const splitItem = item.split(/=(.+)/);

        return {
          envKey: splitItem[0]?.trim()?.replace(/['"]+/g, ""),
          value: splitItem[1]?.trim()?.replace(/['"]+/g, ""),
        };
      })
  );
}
