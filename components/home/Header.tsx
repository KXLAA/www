import { Activity } from "lucide-react";

import { Avatar } from "@/components/common/Avatar";
import { useDate } from "@/lib/hooks/use-date";

export function Header() {
  const { date } = useDate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center text-xs text-[10px] font-medium text-silver-900">
        <p>{date}</p>
        <Activity strokeWidth={1.22} className="w-4 h-4" />
        <p>London, UK 🇬🇧</p>
      </div>

      <div className="flex items-center gap-3">
        <Avatar />

        <div className="text-base font-normal">
          <p className="text-silver-600">Kolade Afode</p>
          <p className="text-sm font-light text-silver-800">
            Frontend Engineer, London UK.
          </p>
        </div>
      </div>
    </div>
  );
}
