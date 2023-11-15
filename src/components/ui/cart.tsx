import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./cart-item";
import { Separator } from "./separator";
import { formatToMoney } from "@/helpers/formatToMoney";

export function Cart() {
  const { products, subTotal, totalDiscount, total } = useCart();

  return (
    <div className="flex flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5">
        {products.length > 0 ? (
          products.map((product) => (
            <CartItem product={product} key={product.id} />
          ))
        ) : (
          <p className="text-center font-semibold">
            Carrinho vazio, vamos fazer compras?
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>SubTotal</p>
          <p>{formatToMoney(subTotal)}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          <p>{formatToMoney(totalDiscount)}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p>{formatToMoney(total)}</p>
        </div>
      </div>
    </div>
  );
}
