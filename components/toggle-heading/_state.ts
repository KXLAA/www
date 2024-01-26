import React from "react";

type ToggleHeadingType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ToggleHeadingContext = React.createContext<ToggleHeadingType>(
  {} as ToggleHeadingType
);

export function useToggleHeading() {
  const context = React.useContext(ToggleHeadingContext);

  if (!context) {
    throw new Error(
      "useToggleHeading must be used within a ToggleHeadingProvider"
    );
  }

  return context;
}
