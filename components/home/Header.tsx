import copy from "copy-to-clipboard";
import { Copy } from "lucide-react";
import React from "react";

export function Header() {
  const { copyEmail, copied } = useCopyEmail();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl font-semibold">KOLA</h1>
      <p className="text-base">
        Design-minded full-stack engineer with experience in building client-
        and server-side web applications.
      </p>

      <div className="flex gap-4">
        <button
          className="flex items-center justify-center gap-1 px-4 py-1 text-sm font-semibold transition-colors border rounded bg-cod-gray-500 border-cod-gray-300 hover:bg-cod-gray-600 hover:border-cod-gray-400"
          onClick={copyEmail}
        >
          <Copy className="w-3 h-3 text-silver-700" />

          <span className="text-xs text-silver-700">
            {copied ? "Copied" : "E-mail"}
          </span>
        </button>
      </div>
    </div>
  );
}

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
