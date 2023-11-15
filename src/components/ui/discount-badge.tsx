import { ArrowDownIcon } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { twMerge } from "tailwind-merge";

export function DiscountBadge({ children, className, ...props }: BadgeProps) {
  return (
    <Badge className={twMerge("gap-1 px-2 py-[2px]", className)} {...props}>
      <ArrowDownIcon size={12} />
      {children}%
    </Badge>
  );
}