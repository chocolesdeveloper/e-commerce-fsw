import { Product } from "@prisma/client";

export interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export function computeProductTotalPrice(
  product: Product,
): ProductWithTotalPrice {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    };
  }

  const priceDiscount =
    Number(product.basePrice) * Number(product.discountPercentage / 100);

  return {
    ...product,
    totalPrice: Number(product.basePrice) - priceDiscount,
  };
}
