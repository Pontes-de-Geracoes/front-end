import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const containerVariants = cva("w-full mx-auto", {
  variants: {
    size: {
      default: "max-w-7xl",
      small: "max-w-5xl",
    },
    variant: {
      main: "flex flex-col select-none justify-center p-6 max-w-full",
      section: "min-h-screen",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ContainerProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof containerVariants> & {
    as?: "section" | "main" | "div";
  };

const Container = ({
  variant,
  size,
  as: Tag = "section",
  className,
  children,
  ...props
}: ContainerProps) => (
  <Tag
    className={cn(containerVariants({ size, variant }), className)}
    {...props}
  >
    {children}
  </Tag>
);

export default Container;
