import { formatToMoney } from "@/helpers/formatToMoney";
import { CartProducts } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";

interface CartItemProps {
  product: CartProducts;
}

export function CartItem({ product }: CartItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          />
        </div>

        <div className=" flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="-text-sm font-bold">
              {formatToMoney(product.totalPrice)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                {formatToMoney(Number(product.basePrice))}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="h-8 w-8"
              size="icon"
              variant="outline"
              disabled={product.quantity === 1}
            >
              <ArrowLeftIcon size={16} />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button className="h-8 w-8" size="icon" variant="outline">
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button size="icon" variant="outline">
        <TrashIcon size={16} />
      </Button>
    </div>
  );
}
