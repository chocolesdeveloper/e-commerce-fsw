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
    <div className="flex flex-col gap-8">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          src={currenctImage}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="grid grid-cols-4 gap-3 px-5">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[90px] items-center justify-center rounded-lg bg-accent
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
