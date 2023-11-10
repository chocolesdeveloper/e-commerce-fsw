"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatToMoney } from "@/helpers/formatToMoney";
import { ProductWithTotalPrice } from "@/helpers/product";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TruckIcon,
} from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "basePrice" | "description" | "discountPercentage" | "totalPrice" | "name"
  >;
}

export function ProductInfo({
  product: { basePrice, description, discountPercentage, totalPrice, name },
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  function handleDecreaseQuantityClick() {
    setQuantity((prevState) => (prevState === 1 ? prevState : prevState - 1));
  }
  function handleIncreaseQuantityClick() {
    setQuantity((prevState) => prevState + 1);
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {formatToMoney(totalPrice)}</h1>
        {discountPercentage > 0 && (
          <Badge className="px-2 py-[2px]">
            <ArrowDownIcon size={14} />
            {discountPercentage}%
          </Badge>
        )}
      </div>

      {discountPercentage > 0 && (
        <p className="text-xs line-through opacity-75">
          {formatToMoney(Number(basePrice))}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          disabled={quantity === 1}
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>
        <span>{quantity}</span>
        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="text-base font-bold">Descrição</h3>
        <p className="text-justify text-sm font-light opacity-60">
          {description}
        </p>
      </div>

      <Button className="mt-8 font-bold uppercase">
        Adicionar ao carrinho
      </Button>

      <div className="rounderd-lg mt-5 flex items-center justify-between bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />

          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">FSPacket®</span>
            </p>
            <p className="text-xs text-[#8162ff]">
              Envio para <span className="font-bold">todo BRASIL</span>
            </p>
          </div>
        </div>
        <p className="font-bold">Frete Grátis</p>
      </div>
    </div>
  );
}
