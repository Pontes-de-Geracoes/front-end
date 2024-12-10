import { HeartHandshake, LucideProps } from "lucide-react";

type LogoType = {
  size?: number;
} & LucideProps;

const Logo = ({ size = 48, ...props }: LogoType) => {
  return <HeartHandshake size={size} {...props} />;
};

export default Logo;
