import copy from "copy-to-clipboard";
import React from "react";

export function useCopyEmail() {
  const [copied, setCopied] = React.useState(false);
  const email = process.env.NEXT_PUBLIC_EMAIL;

  React.useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyEmail = () => {
    setCopied(true);
    copy(email!);
  };

  return { copied, copyEmail };
}
