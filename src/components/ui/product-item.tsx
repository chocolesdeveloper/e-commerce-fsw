import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { formatToMoney } from "@/helpers/formatToMoney";
import Link from "next/link";
import { DiscountBadge } from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[60%] w-auto max-w-[80%] object-contain"
            alt={`Image de: ${product.name}`}
          />

          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div>
            {product.discountPercentage > 0 ? (
              <div className="flex items-baseline justify-between">
                <p className="font-semibold">
                  {formatToMoney(product.totalPrice)}
                </p>

                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                  {formatToMoney(Number(product.basePrice))}
                </p>
              </div>
            ) : (
              <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                {formatToMoney(Number(product.basePrice))}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
