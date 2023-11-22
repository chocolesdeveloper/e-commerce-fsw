import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "./cart-item";
import { Separator } from "./separator";
import { formatToMoney } from "@/helpers/formatToMoney";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Button } from "./button";
import createCheckout from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createOrder } from "@/actions/order";

export function Cart() {
  const { products, subTotal, totalDiscount, total } = useCart();

  const { status, data } = useSession();

  async function handleFinishedPurchaseClick() {
    if (status === "unauthenticated") {
      return toast.error("Faça login para continuar!");
    }

    await createOrder(products, data?.user?.id!);

    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-1 flex-col gap-5 overflow-hidden">
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem product={product} key={product.id} />
              ))
            ) : (
              <p className="text-center font-semibold">
                Carrinho vazio, vamos fazer compras?
              </p>
            )}
            <ScrollBar orientation="vertical" />
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
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
      )}

      {products.length > 0 && (
        <Button
          className="mt-7 font-bold uppercase"
          onClick={handleFinishedPurchaseClick}
        >
          Finalizar compra
        </Button>
      )}
    </div>
  );
}
