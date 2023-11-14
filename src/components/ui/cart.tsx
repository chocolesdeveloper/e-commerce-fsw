import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useCart } from "@/hooks/useCart";

export function Cart() {
  const { products } = useCart();

  return (
    <div>
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Catálogo
      </Badge>

      {products.map((product) => (
        <h1 key={product.id}>{product.name}</h1>
      ))}
    </div>
  );
}
