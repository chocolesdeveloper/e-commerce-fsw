import { prismaClient } from "@/lib/prisma";
import { ProductImage } from "./components/product-image";
import { ProductInfo } from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailsPage({
  params: { slug },
}: ProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!product) return null;

  return (
    <div className=" flex flex-col gap-8">
      <ProductImage imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductTotalPrice(product)} />
    </div>
  );
}
