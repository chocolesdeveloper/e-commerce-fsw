import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductList } from "../../components/ui/product-list";
import { SectionTitle } from "../../components/ui/section-title";
import { PromoBanner } from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="container flex flex-col gap-8 pb-8">
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto esse mês"
        className="px-5 md:hidden"
      />
      <PromoBanner
        src="/banner-home-01-desktop.png"
        alt="Até 55% de desconto esse mês"
        className="hidden px-5 md:block"
      />

      <Categories />

      <div>
        <SectionTitle>ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <div className="grid grid-cols-1 gap-2 px-2 md:grid-cols-2">
        <PromoBanner
          src="/banner-home-02.png"
          alt="Até 55% de desconto em mouses!"
        />
        <PromoBanner
          src="/banner-home-03.png"
          alt="Até 55% de desconto em mouses!"
          className="hidden w-full md:block"
        />
      </div>

      <div>
        <SectionTitle>teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src="/banner-home-03.png"
        alt="Até 55% de desconto em mouses!"
        className="block px-5 md:hidden"
      />
      <PromoBanner
        src="/banner-fretegratis.png"
        alt="Até 55% de desconto em mouses!"
        className="hidden h-60 object-contain md:block"
      />

      <div>
        <SectionTitle>mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
