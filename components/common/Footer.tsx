import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { Logo } from "@/components/common/Logo";

export function Footer() {
  return (
    <footer className="relative flex items-center justify-between w-full border-shimmer rounded-4xl bg-shark-900 p-7">
      <Logo className="h-14 w-14 text-silver" />

      <div className="flex gap-4">
        <FooterLink link="https://github.com/KXLAA">GITHUB</FooterLink>
        <FooterLink link="https://twitter.com/kxlaa_">TWITTER</FooterLink>
        <FooterLink link="https://twitter.com/kxlaa_">EMAIL</FooterLink>
        {/* <FooterLink link="https://www.linkedin.com/in/kxlaa/">
          LINKEDIN
        </FooterLink> */}
      </div>
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
      className="flex items-center justify-center gap-2 p-3 text-lg transition duration-300 ease-in-out border ga rounded-xl border-shark-700 bg-shark-800 text-silver-50 hover:border-shark-600 hover:bg-shark-700"
    >
      {children}
      <ArrowTopRightIcon className="w-6 h-6" />
    </a>
  );
}
