import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      className="flex justify-between w-full gap-4 pt-3 border-t border-t-cod-gray-400"
      id="links"
    >
      <div className="flex w-full gap-4">
        <FooterLink link="https://github.com/KXLAA">GitHub</FooterLink>
        <FooterLink link="https://twitter.com/kxlaa_">Twitter</FooterLink>
      </div>
      <Logo className="w-7 h-7 text-silver-700" />
    </footer>
  );
}

type FooterLinkProps = {
  link: string;
  children: React.ReactNode;
};

function FooterLink(props: FooterLinkProps) {
  const { link, children } = props;
  return (
    <a
      href={link}
      className="flex flex-wrap items-center justify-center gap-1 text-xs transition-colors text-silver-700 md:text-sm font-extralight hover:text-silver-400"
    >
      {children}
    </a>
  );
}
