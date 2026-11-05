import { getStoreText } from "@/lib/store-language.server";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import { Product } from "@/types";
import ProductImages from "./product-images";
import ProductPrice from "./product-price";

type DetailProduct = Pick<Product, "name" | "brand" | "category" | "description" | "images" | "price" | "stock">;

export default async function ProductDetailContent({ product, children, collectionHref = "/" }: { product: DetailProduct; children: React.ReactNode; collectionHref?: string }) {
  const t = await getStoreText();
  return (
    <section>
      <Link href={collectionHref} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft size={16} strokeWidth={1.5} />{t("Retour à la collection", "Back to the collection")}</Link>
      <div className="grid min-w-0 gap-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] lg:gap-12 xl:gap-16">
        <ProductImages images={product.images} name={product.name} />
        <div className="min-w-0 md:py-4">
          <p className="archive-rule">{product.brand}</p>
          <h1 className="archive-display mt-4 text-4xl leading-tight lg:text-5xl">{product.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{product.category}</p>
          <div className="my-8 flex flex-wrap items-center justify-between gap-4 border-y py-6">
            <ProductPrice value={product.price} className="text-2xl" />
            <span className="text-sm text-muted-foreground">{product.stock > 0 ? t("En stock", "In stock") : t("Épuisé", "Sold out")}</span>
          </div>
          {children}
          <div className="mt-8 border-t pt-8">
            <h2 className="text-base font-medium">{t("Le maillot en détail", "Jersey details")}</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">{product.description}</p>
          </div>
          <div className="mt-8 rounded-xl border bg-card p-5 sm:p-6">
            <h2 className="flex items-center gap-2 text-sm font-medium"><MessageCircle size={16} strokeWidth={1.5} />{t("Commander sur WhatsApp", "Order on WhatsApp")}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("Vous préférez échanger avec nous ? Contactez-nous pour passer commande", "Prefer to chat? Message us to place your order")}</p>
            <div className="mt-4 flex flex-col gap-3">
              {["212664455211", "212680610018"].map((number, index) => (
                <a key={number} href={`https://wa.me/${number}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-lg border bg-background px-4 py-3 text-sm tabular-nums transition-colors hover:bg-muted">
                  {index === 0 ? "+212 664 455 211" : "+212 680 610 018"}<ArrowUpRight size={16} strokeWidth={1.5} /><span className="sr-only">{t("Ouvrir WhatsApp dans un nouvel onglet", "Open WhatsApp in a new tab")}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
