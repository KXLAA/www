import type { Config } from "unique-names-generator";
import {
  animals,
  colors,
  countries,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";

import { uuid } from "@/lib/uuid";

type Args = {
  count?: number;
  style?: "lowerCase" | "upperCase" | "capital";
  justInitials?: boolean;
  addPropertyToEach?: (item: Item) => any;
};

export function generateData(args: Args): Item[] {
  const {
    count = 5,
    style = "upperCase",
    justInitials,
    addPropertyToEach,
  } = args;

  const uniqueNamesConfig: Config = {
    dictionaries: [colors, animals, names, countries],
    separator: " ",
    length: 1,
    style: style,
  };

  const data = Array.from({ length: count }, () => {
    return {
      id: uuid(),
      name: justInitials
        ? uniqueNamesGenerator(uniqueNamesConfig).slice(0, 2)
        : uniqueNamesGenerator(uniqueNamesConfig),
    };
  });

  if (addPropertyToEach) {
    return data.map((item) => addPropertyToEach(item));
  }

  return data;
}

type Item = {
  id: string;
  name: string;
};
