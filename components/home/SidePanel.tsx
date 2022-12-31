import {
  DesktopIcon,
  FileTextIcon,
  HomeIcon,
  Link2Icon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export function SidePanel() {
  return (
    <div className="flex flex-col items-center w-16 gap-4 p-4 bg-shark-700 rounded-xl md:sticky md:top-16 shadow-border-shiny">
      <a href="#about">
        <HomeIcon className="w-10 h-10 p-2 rounded-lg text-silver bg-shark-600" />
      </a>
      <Link href="posts">
        <FileTextIcon className="w-10 h-10 p-2 rounded-lg text-silver bg-shark-600" />
      </Link>
      <a href="#work">
        <DesktopIcon className="w-10 h-10 p-2 rounded-lg text-silver bg-shark-600" />
      </a>
      <a href="#links">
        <Link2Icon className="w-10 h-10 p-2 rounded-lg text-silver bg-shark-600" />
      </a>
    </div>
  );
}
