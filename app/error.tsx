"use client";

import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>Oh no, something went wrong... maybe refresh?</p>
    </div>
  );
}
