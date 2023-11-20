"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export interface CartProducts extends ProductWithTotalPrice {
  quantity: number;
}
interface ICartContext {
  products: CartProducts[];
  subTotal: number;
  total: number;
  totalDiscount: number;
  addProductToCart: (product: CartProducts) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext({} as ICartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProducts[]>([]);

  useEffect(() => {
    setProducts(
      JSON.parse(localStorage.getItem("@fsw-store/cart-products") || "[]"),
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("@fsw-store/cart-products", JSON.stringify(products));
  }, [products]);

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity;
    }, 0);
  }, [products]);

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.totalPrice * product.quantity);
    }, 0);
  }, [products]);

  const totalDiscount = total - subTotal;

  function addProductToCart(product: CartProducts) {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      return setProducts((prevState) =>
        prevState.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );
    }

    setProducts((prevState) => [...prevState, product]);
  }

  function decreaseProductQuantity(productId: string) {
    return setProducts((prevState) =>
      prevState
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }
          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  }

  function increaseProductQuantity(productId: string) {
    return setProducts((prevState) =>
      prevState.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }
        return cartProduct;
      }),
    );
  }

  function removeProductFromCart(productId: string) {
    return setProducts((prevState) =>
      prevState.filter((cartProduct) => cartProduct.id !== productId),
    );
  }

  return (
    <CartContext.Provider
      value={{
        products,
        subTotal,
        total,
        totalDiscount,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
