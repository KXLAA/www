type TagProps = {
  children: React.ReactNode;
};

export function Tag(props: TagProps) {
  return (
    <span className="flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-gray-dark-2 rounded-md text-gray-dark-10">
      {props.children}
    </span>
  );
}
