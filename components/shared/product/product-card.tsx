import { getStoreText } from "@/lib/store-language.server";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProductPrice from "./product-price";
import { Product } from "@/types";

export default async function ProductCard({ product, number, href }: { product: Product; number: number; href: string }) {
  const t = await getStoreText();
  return (
    <article className="min-w-0">
      <Link href={href} className="group block rounded-xl">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl border bg-muted">
          {product.images[0] && <Image src={product.images[0]} alt="" fill sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw" className="object-contain" />}
          {product.stock <= 0 && <span className="absolute bottom-2 left-2 rounded bg-background px-2 py-1 text-xs sm:bottom-3 sm:left-3">{t("Épuisé", "Sold out")}</span>}
        </div>
        <div className="pt-3 sm:pt-4">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="archive-number" aria-hidden="true">N° {String(number).padStart(2, "0")}</span>
            {product.brand}
          </p>
          <div className="mt-2 flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium leading-5 group-hover:underline group-hover:underline-offset-4 sm:text-base sm:leading-6">{product.name}</h3>
            <ArrowUpRight size={18} className="hidden shrink-0 text-muted-foreground sm:block" strokeWidth={1.5} aria-hidden="true" />
          </div>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{product.category}</p>
          <ProductPrice value={product.price} className="mt-3 text-sm sm:text-base" />
        </div>
      </Link>
    </article>
  );
}
