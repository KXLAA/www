import React from "react";

type StepContextType = {
  open: string[];
  setOpen: (open: string[]) => void;
  toggleOpenAll: () => void;
  toggleOpen: (id: number) => void;
  isShowingAll: boolean;
};

export const StepContext = React.createContext<StepContextType>(
  {} as StepContextType
);

export function useSteps() {
  const context = React.useContext(StepContext);

  if (!context) {
    throw new Error("useSteps must be used within a StepsProvider");
  }

  return context;
}
