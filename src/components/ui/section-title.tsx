import { ComponentProps } from "react";

export function SectionTitle({
  children,
  ...props
}: ComponentProps<"p">): React.ReactNode {
  return (
    <p className="mb-3 pl-5 font-bold uppercase" {...props}>
      {children}
    </p>
  );
}
