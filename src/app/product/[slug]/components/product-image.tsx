"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  name: string;
  imageUrls: string[];
}

export function ProductImage({ name, imageUrls }: ProductImageProps) {
  const [currenctImage, setCurrenctImage] = useState(imageUrls[0]);

  function handleImageClick(imageUrl: string) {
    setCurrenctImage(imageUrl);
  }

  return (
    <div className="relative flex flex-col gap-8">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent lg:h-[670px] lg:w-[736px]">
        <Image
          src={currenctImage}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-[60%] object-contain"
        />
      </div>

      <div className="left-2 top-6 grid grid-cols-4 gap-3 px-5  lg:absolute lg:flex lg:max-h-20 lg:flex-col lg:gap-4">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[90px] items-center justify-center rounded-lg bg-accent lg:bg-black
              ${
                imageUrl === currenctImage &&
                "border-2 border-solid border-primary"
              }
            `}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
