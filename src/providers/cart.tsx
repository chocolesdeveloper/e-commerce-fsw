"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

interface CartProducts extends Product {
  quantity: number;
}

interface ICartContext {
  products: CartProducts[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductToCart: (product: CartProducts) => void;
}

export const CartContext = createContext({} as ICartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProducts[]>([]);

  function addProductToCart(product: CartProducts) {
    setProducts((prevState) => [...prevState, product]);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
