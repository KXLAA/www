import NextLink from "next/link";

function H2({ children }: any) {
  const id = children[1].toLowerCase().replace(/ /g, "-");
  return <h2 id={id}>{children}</h2>;
}

function Code({ children }: any) {
  return (
    <code className="px-1 py-0.5 rounded-md bg-shark-900 text-silver-600 font-normal shadow-border-shiny">
      {children}
    </code>
  );
}
function A({ href, ...props }: any) {
  if (href.startsWith("http")) {
    return (
      <a
        {...props}
        href={href}
        styles={{ fontSize: "inherit" }}
        target="_blank"
        rel="noopener noreferrer"
      />
    );
  }
  return (
    <NextLink href={href} passHref>
      <a {...props} styles={{ color: "inherit", fontSize: "inherit" }} />
    </NextLink>
  );
}

// function Pre() {}

export { A, Code, H2 };
