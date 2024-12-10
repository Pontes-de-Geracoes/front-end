import { cn } from "../../lib/utils";
import { AnchorHTMLAttributes } from "react";

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export const Anchor = ({
  children,
  className,
  ...props
}: AnchorProps): JSX.Element => (
  <a className={cn("cursor-pointer", className)} {...props}>
    {children}
  </a>
);

export default Anchor;
