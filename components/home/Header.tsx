import Link from "next/link";
import { useRouter } from "next/router";

import { cx } from "@/lib/cx";
import { useFeature } from "@/lib/flags";

export function Header() {
  const isFeatureEnabled = useFeature("headerNav");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="text-3xl">
          <p className="font-semibold text-silver-600">Kolade Afode</p>
          <p className="text-base font-light text-silver-800">
            Frontend Engineer, London UK.
          </p>
        </div>
      </div>
      <nav className={cx("self-start", !isFeatureEnabled && "hidden")}>
        <ul className="flex items-center justify-center gap-6">
          <HeaderLink label="Index" href="/" />
          <HeaderLink label="Posts" href="/posts" />
          <HeaderLink label="Experiments" href="/experiments" />
          <HeaderLink label="Wiki" href="/wiki" />
        </ul>
      </nav>
    </div>
  );
}

type HeaderLinkProps = {
  href: string;
  label: string;
};

function HeaderLink(props: HeaderLinkProps) {
  const isActive = useActiveLink(props.href);

  return (
    <li>
      <Link
        href={props.href}
        className={cx(
          "transition-colors text-base font-light text-silver-700 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy",
          isActive && "text-silver-300 font-normal"
        )}
        data-splitbee-event={`Click on ${props.label}`}
      >
        {props.label}
      </Link>
    </li>
  );
}

function useActiveLink(pathname: string) {
  const router = useRouter();
  return router.pathname === pathname;
}
