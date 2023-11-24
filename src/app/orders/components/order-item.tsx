import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";

import { format } from "date-fns";
import { OrderProductItem } from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { formatToMoney } from "@/helpers/formatToMoney";
import { computeProductTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "./helpers/status";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

export function OrderItem({ order }: OrderItemProps) {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return acc + Number(orderProduct.basePrice) * orderProduct.quantity;
    }, 0);
  }, [order]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      const productWithTotalPrice = computeProductTotalPrice(
        orderProduct.product,
      );
      return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
    }, 0);
  }, [order]);

  const totalDiscount = total - subtotal;

  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <h2>Pedido com {order.orderProducts.length} produto(s)</h2>
              <p className="text-xs opacity-70">
                Feito em {format(order.createdAt, "d/MM/y 'ás' HH:mm ")}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162ff]">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-75">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-75">Cartão</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {order.orderProducts.map((orderProduct) => (
                  <OrderProductItem
                    key={orderProduct.id}
                    orderProduct={orderProduct}
                  />
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-1 text-xs">
                <Separator />

                <div className="flex w-full flex-1 justify-between py-3">
                  <p>Subtotal</p>
                  <p>{formatToMoney(subtotal)}</p>
                </div>

                <Separator />

                <div className="flex w-full flex-1 justify-between py-3">
                  <p>Entrega</p>
                  <p>GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex w-full flex-1 justify-between py-3">
                  <p>Desconto</p>
                  <p>{formatToMoney(totalDiscount)}</p>
                </div>

                <Separator />

                <div className="flex w-full flex-1 justify-between py-3 text-sm font-bold">
                  <p>Total</p>
                  <p>{formatToMoney(total)}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
