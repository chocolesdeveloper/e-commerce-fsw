"use server";

import { stripe } from "@/lib/stripe";
import { CartProducts } from "@/providers/cart";

export default async function createCheckout(
  products: CartProducts[],
  orderId: string,
) {
  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: process.env.HOST_URL,
    cancel_url: process.env.HOST_URL,
    metadata: {
      orderId,
    },
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            description: product.description,
            images: product.imageUrls,
          },
          unit_amount: product.totalPrice * 100, //centavos
        },
        quantity: product.quantity,
      };
    }),
  });

  return checkout;
}
