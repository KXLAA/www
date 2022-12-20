// type WithChildren = {
//   children: React.ReactNode;
// };

export function H2({ children }: any) {
  const id = children[1].toLowerCase().replace(/ /g, "-");
  return <h2 id={id}>{children}</h2>;
}
