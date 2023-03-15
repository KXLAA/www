import React from "react";

import { useCallbackRef } from "./use-callback-ref";

type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange,
  });

  //check if state is controlled
  const isControlled = prop !== undefined;

  //if it is controlled, use the prop value, otherwise use the uncontrolled value
  const value = isControlled ? prop : uncontrolledProp;

  //store the onChange function in a ref
  const handleChange = useCallbackRef(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
    React.useCallback(
      (nextValue) => {
        if (isControlled) {
          const setter = nextValue as SetStateFn<T>;

          console.log("setter", typeof nextValue === "function");

          const value =
            typeof nextValue === "function" ? setter(prop) : nextValue;

          if (value !== prop) handleChange(value as T);
        } else {
          setUncontrolledProp(nextValue);
        }
      },
      [isControlled, prop, setUncontrolledProp, handleChange]
    );

  return [value, setValue] as const;
}

function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, "prop">) {
  const uncontrolledState = React.useState<T | undefined>(defaultProp);
  //the value
  const [value] = uncontrolledState;
  //store the value in a ref
  const prevValueRef = React.useRef(value);

  //a user can pass in a function to call on state change, put that function in a ref
  const handleChange = useCallbackRef(onChange);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      //call that function with the new value in the ref
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
}

export { useControllableState };
