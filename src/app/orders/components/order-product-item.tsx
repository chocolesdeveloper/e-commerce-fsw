import { formatToMoney } from "@/helpers/formatToMoney";
import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client";

import Image from "next/image";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

export function OrderProductItem({ orderProduct }: OrderProductItemProps) {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);

  return (
    <div className="flex h-full items-center gap-4">
      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          alt={orderProduct.product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="max-h[80%] h-auto w-auto max-w-[70%] object-contain"
        />
      </div>

      <div className="flex h-[77px] flex-1 flex-col justify-between gap-1">
        <div className="flex w-fit rounded-md bg-accent px-3 py-1">
          <p className="text-[10px]">
            Vendido e entre por <span className="font-bold">FSW Store</span>
          </p>
        </div>

        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex items-center justify-between gap-1 lg:flex-row-reverse">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-2 lg:flex-col lg:items-end">
              <p className="text-sm font-bold lg:text-xl">
                {formatToMoney(productWithTotalPrice.totalPrice)}
              </p>

              {productWithTotalPrice.discountPercentage > 0 && (
                <p className="text-xs line-through opacity-60">
                  {formatToMoney(Number(productWithTotalPrice.basePrice))}
                </p>
              )}
            </div>
          </div>

          <p className="opacity-60">Quantidade: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  );
}
