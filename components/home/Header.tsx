import Link from "next/link";
import { useRouter } from "next/router";

import { cx } from "@/lib/cx";
import { useFeatures } from "@/lib/flags";

type HeaderProps = {
  heading?: string;
  subheading?: string;
};

export function Header(props: HeaderProps) {
  const {
    heading = "Kolade Afode.",
    subheading = "Frontend Engineer, London UK.",
  } = props;

  const features = useFeatures(["posts", "experiments", "wiki", "projects"]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="text-3xl">
          <p className="font-semibold text-silver-600">{heading}</p>
          <p className="text-base font-light text-silver-800">{subheading}</p>
        </div>
      </div>
      <nav className={cx("self-start")}>
        <ul className="flex items-center justify-center gap-6">
          <HeaderLink label="Index" href="/" enabled />
          <HeaderLink label="Writing" href="/posts" enabled={features.posts} />
          <HeaderLink label="Wiki" href="/wiki" enabled={features.wiki} />
          <HeaderLink
            label="Experiments"
            href="/experiments"
            enabled={features.experiments}
          />
        </ul>
      </nav>
    </div>
  );
}

type HeaderLinkProps = {
  href: string;
  label: string;
  className?: string;
  enabled?: boolean;
};

function HeaderLink(props: HeaderLinkProps) {
  const isActive = useActiveLink(props.href);

  return (
    <li className={cx(props.enabled ? "" : "hidden")}>
      <Link
        href={props.href}
        className={cx(
          "transition-colors text-base font-light text-silver-700 hover:text-silver-900 hover:underline underline-offset-4 hover:decoration-wavy",
          isActive && "text-silver-300 font-normal",
          props.className
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
