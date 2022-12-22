// type WithChildren = {
//   children: React.ReactNode;
// };

export function H2({ children }: any) {
  const id = children[1].toLowerCase().replace(/ /g, "-");
  return <h2 id={id}>{children}</h2>;
}

export function Code({ children }: any) {
  return (
    <code className="px-1 py-0.5 rounded-md bg-shark-900 text-silver-600 font-normal shiny-border">
      {children}
    </code>
  );
}
