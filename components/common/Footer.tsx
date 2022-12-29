import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export function Footer() {
  return (
    <footer className="flex gap-4">
      <FooterLink link="https://github.com/KXLAA">GITHUB</FooterLink>
      <FooterLink link="https://twitter.com/kxlaa_">TWITTER</FooterLink>
      <FooterLink link="https://twitter.com/kxlaa_">EMAIL</FooterLink>
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
      className="flex items-center justify-center w-full gap-2 p-2 text-base transition duration-300 ease-in-out rounded-md text-silver-50 bg-[#1E1E1E] hover:shadow-border-shiny"
    >
      {children}
      <div className="self-start p-1 transition-colors duration-200 rounded-full shadow-border-shiny text-silver-700">
        <ArrowTopRightIcon className="w-3 h-3" />
      </div>
    </a>
  );
}
