import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer className="flex w-full gap-2" id="links">
      <FooterLink link="https://github.com/KXLAA">GITHUB</FooterLink>
      <FooterLink link="https://twitter.com/kxlaa_">TWITTER</FooterLink>
      <FooterLink link="mailto:kolade.afode@yahoo.com">EMAIL</FooterLink>
      <FooterLink link="https://www.linkedin.com/in/kxlaa/">
        LINKEDIN
      </FooterLink>
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
      className="flex flex-wrap items-center justify-center gap-1 text-sm transition-colors font-extralight hover:text-silver-900"
    >
      {children}
      <div className="self-start p-1 transition-colors">
        <ArrowTopRightIcon className="w-4 h-4 " />
      </div>
    </a>
  );
}
