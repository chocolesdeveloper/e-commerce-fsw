"use client";

import { Button } from "@/components/ui/button";
import { DiscountBadge } from "@/components/ui/discount-badge";
import { formatToMoney } from "@/helpers/formatToMoney";
import { ProductWithTotalPrice } from "@/helpers/product";
import { useCart } from "@/hooks/useCart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart } = useCart();

  function handleDecreaseQuantityClick() {
    setQuantity((prevState) => (prevState === 1 ? prevState : prevState - 1));
  }
  function handleIncreaseQuantityClick() {
    setQuantity((prevState) => prevState + 1);
  }

  function handleAddProductToCartClick() {
    addProductToCart({
      ...product,
      quantity,
    });

    toast.success("Adicionado ao carrinho ❤️");
  }

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">
          R$ {formatToMoney(product.totalPrice)}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-xs line-through opacity-75">
          {formatToMoney(Number(product.basePrice))}
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
          {product.description}
        </p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddProductToCartClick}
      >
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
