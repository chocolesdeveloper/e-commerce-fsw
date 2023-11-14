import { CartContext } from "@/providers/cart";
import { useContext } from "react";

export function useCart() {
  const cart = useContext(CartContext);

  return cart;
}
