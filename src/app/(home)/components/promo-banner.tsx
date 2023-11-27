import Image, { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

export function PromoBanner({ alt, className, ...props }: ImageProps) {
  const classNameMerge = twMerge("h-auto w-full", className);

  return (
    <Image
      {...props}
      alt={alt}
      height={0}
      width={0}
      className={classNameMerge}
      sizes="100vw"
    />
  );
}
