import { ProductItem } from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex w-full gap-4 overflow-auto overflow-x-auto px-5 py-2 lg:[&::-webkit-scrollbar-thumb]:bg-primary lg:[&::-webkit-scrollbar-track]:bg-secondary [&::-webkit-scrollbar]:h-1 sm:max-md:[&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <div key={product.id} className="w-[170px] max-w-[170px]">
          <ProductItem product={computeProductTotalPrice(product)} />
        </div>
      ))}
    </div>
  );
}
