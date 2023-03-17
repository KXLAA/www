import React from "react";

import { useControllableState } from "@/components/posts/widgets/accessible-components-post/common/use-controllable-state";

type ActivationMode = "automatic" | "manual";
type Orientation = "horizontal" | "vertical";
type NativeProps<T extends React.ElementType<any>, Obj = object> = Obj &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Obj>;

type TabsContextValue = {
  value?: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
  activationMode?: ActivationMode;
  orientation?: Orientation;
};

const TabsContext = React.createContext<TabsContextValue>(
  {} as TabsContextValue
);

type RootProps = NativeProps<
  "div",
  {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    activationMode?: ActivationMode;
    orientation?: Orientation;
  }
>;

export const Root = React.forwardRef<HTMLDivElement, RootProps>(
  (props, ref) => {
    const { children, value, ...rest } = useTabs(props);
    return (
      <TabsContext.Provider value={value}>
        <div ref={ref} data-orientation={value.orientation} {...rest}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

function useTabs(props: RootProps) {
  const [value, setValue] = useControllableState({
    prop: props.value,
    onChange: props.onValueChange,
    defaultProp: props.defaultValue,
  });

  const {
    defaultValue,
    activationMode = "automatic",
    orientation = "horizontal",
    ...rest
  } = props;

  const providerValue = useMemoiseValues({
    defaultValue,
    value,
    onValueChange: setValue,
    activationMode,
    orientation,
  });

  return {
    ...rest,
    value: providerValue,
  };
}

function useMemoiseValues<T extends object>(values: T) {
  const deps = Object.values(values);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => values, [deps]);
}
