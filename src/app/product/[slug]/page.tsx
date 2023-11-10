import { prismaClient } from "@/lib/prisma";
import { ProductImage } from "./components/product-image";

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
    <div>
      <ProductImage imageUrls={product.imageUrls} name={product.name} />
    </div>
  );
}
