import { getStoreText } from "@/lib/store-language.server";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import CollectionIntro from "./collection-intro";
import ProductCard from "./product-card";

type ProductListProps = {
  data: Product[];
  title?: string;
  limit?: number;
  productHref?: (slug: string) => string;
};

export default async function ProductList({ data, title, limit, productHref = (slug) => `/product/${slug}` }: ProductListProps) {
  const t = await getStoreText();
  const products = limit ? data.slice(0, limit) : data;
  const featured = products.find((product) => product.isFeatured && product.images[0])
    ?? products.find((product) => product.images[0]);

  return (
    <div className="space-y-12 lg:space-y-16">
      <CollectionIntro>
        <div className="px-5 py-10 sm:px-8 sm:py-12 lg:self-center lg:p-12" data-intro>
          <p className="archive-rule">{t("La collection Koora", "The Koora collection")}</p>
          <h1 className="archive-display mt-5 text-[clamp(2.5rem,7vw,5rem)] leading-[0.98]">
            {t("Maillots de", "Football")}<br className="hidden sm:inline" /> {t("football", "jerseys")}
          </h1>
          <p className="mt-5 max-w-[30ch] text-base leading-7 text-muted-foreground">
            {t("Retrouvez les couleurs de vos clubs et découvrez chaque maillot en détail", "Find your club’s colours and take a closer look at each jersey")}
          </p>
          <Button asChild size="lg" className="mt-7 h-12 justify-between gap-4 px-4">
            <a href="#collection-title">{t("Voir la collection", "Shop the collection")} <ArrowDown strokeWidth={1.5} aria-hidden="true" /></a>
          </Button>
        </div>
        {featured && (
          <Link href={productHref(featured.slug)} className="group block min-w-0 rounded-lg border bg-background" data-intro>
            <div className="relative aspect-[5/4] overflow-hidden rounded-t-lg bg-muted lg:aspect-[3/2]">
              <Image src={featured.images[0]} alt="" fill priority sizes="(max-width: 1023px) 100vw, 52vw" className="object-cover object-top" />
            </div>
            <div className="flex items-center justify-between gap-4 border-t px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{t("À la une", "Featured jersey")}</p>
                <p className="mt-1 text-sm font-medium group-hover:underline group-hover:underline-offset-4">{featured.name}</p>
              </div>
              <ArrowUpRight size={18} strokeWidth={1.5} className="shrink-0 text-muted-foreground" aria-hidden="true" />
            </div>
          </Link>
        )}
      </CollectionIntro>

      <section aria-labelledby="collection-title">
        <div className="mb-5 flex items-end justify-between gap-4 border-b pb-4 sm:mb-6 sm:pb-5">
          <h2 id="collection-title" tabIndex={-1} className="archive-display scroll-mt-6 text-4xl sm:text-5xl">{title ?? t("Les maillots", "Jerseys")}</h2>
          <p className="shrink-0 pb-1 text-sm tabular-nums text-muted-foreground">{products.length} {products.length === 1 ? t("maillot", "jersey") : t("maillots", "jerseys")}</p>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-10">
            {products.map((product, index) => <ProductCard key={product.id} product={product} number={index + 1} href={productHref(product.slug)} />)}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed px-6 py-16 text-center">
            <h3 className="text-xl font-medium">{t("Aucun maillot pour le moment", "No jerseys available yet")}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{t("Les prochaines pièces apparaîtront ici", "New arrivals will appear here")}</p>
          </div>
        )}
      </section>
    </div>
  );
}
