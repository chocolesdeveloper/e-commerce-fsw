import { prismaClient } from "@/lib/prisma";
import { ProductImage } from "./components/product-image";
import { ProductInfo } from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import { ProductList } from "@/components/ui/product-list";
import { SectionTitle } from "@/components/ui/section-title";

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
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  return (
    <div className=" container flex flex-col pb-8">
      <div className="flex flex-col gap-8 pb-8 lg:flex-row">
        <ProductImage imageUrls={product.imageUrls} name={product.name} />
        <ProductInfo product={computeProductTotalPrice(product)} />
      </div>

      <SectionTitle>Produtos relacionados</SectionTitle>
      <ProductList products={product.category.products} />
    </div>
  );
}
