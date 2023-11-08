import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";
import { formatToMoney } from "@/helpers/formatToMoney";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="flex max-w-[156px] flex-col gap-4">
      <div className="relative flex h-[170px] w-[156px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[60%] w-auto max-w-[80%] object-contain"
          alt={`Image de: ${product.name}`}
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-2 top-2 px-2 py-[2px]">
            <ArrowDownIcon size={12} />
            {product.discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>

        <div className="flex items-baseline gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <p className="font-semibold">
                {formatToMoney(product.totalPrice)}
              </p>

              <p className="text-xs line-through opacity-75">
                {formatToMoney(Number(product.basePrice))}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold">
              {formatToMoney(Number(product.basePrice))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
