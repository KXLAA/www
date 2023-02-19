import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      className="flex justify-between w-full gap-4 pt-3 border-t border-t-cod-gray-400"
      id="links"
    >
      <div className="flex w-full gap-4">
        {FOOTER_LINKS.map(({ link, label }) => (
          <a
            key={link}
            href={link}
            className="flex flex-wrap items-center justify-center gap-1 text-xs transition-colors text-silver-700 md:text-sm font-extralight hover:text-silver-400"
            target="_blank"
            rel="noreferrer"
          >
            {label}
          </a>
        ))}
      </div>
      <Logo className="w-7 h-7 text-silver-700" />
    </footer>
  );
}

const FOOTER_LINKS = [
  {
    label: "GitHub",
    link: "https://github.com/KXLAA",
  },
  {
    label: "Twitter",
    link: "https://twitter.com/kxlaa_",
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/kxlaa",
  },
];
