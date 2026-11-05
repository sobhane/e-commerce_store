"use client";

import { useStoreLanguage } from "@/components/shared/store-language-provider";
import { storeText } from "@/lib/store-language";
import { CartSchema } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { ArrowLeft, ArrowRight, Loader, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function CartTable({ cart }: { cart?: CartSchema }) {
  const language = useStoreLanguage();
  const t = storeText(language);
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const count = cart?.items.reduce((total, item) => total + item.qty, 0) || 0;

  function changeQuantity(index: number, remove: boolean) {
    const item = cart?.items[index];
    if (!item || isPending) return;
    startTransition(async () => {
      const result = remove ? await removeItemFromCart(item.productId, item.size) : await addItemToCart(item, item.size);
      if (!result.success) toast({ title: t("Impossible de modifier le panier", "Couldn’t update your cart"), description: result.message, variant: "destructive" });
      router.refresh();
    });
  }

  return (
    <section>
      <p className="archive-rule">{t("Votre sélection", "Your selection")}</p>
      <div className="mb-8 mt-4 flex items-baseline gap-4 sm:mb-10">
        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">{t("Panier", "Cart")}</h1>
        <span className="text-sm tabular-nums text-muted-foreground">{count} {count === 1 ? t("article", "item") : t("articles", "items")}</span>
      </div>
      {!cart || cart.items.length === 0 ? (
        <div className="rounded-xl border px-6 py-16 text-center">
          <ShoppingBag className="mx-auto mb-5 text-muted-foreground" size={24} strokeWidth={1.5} />
          <h2 className="text-xl font-medium">{t("Votre panier attend son premier maillot", "Your cart is empty")}</h2>
          <p className="mb-6 mt-3 text-sm text-muted-foreground">{t("Retrouvez les dernières pièces de la collection", "Browse the latest jerseys in the collection")}</p>
          <Button asChild><Link href="/">{t("Découvrir les maillots", "Shop jerseys")}<ArrowRight strokeWidth={1.5} /></Link></Button>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px] lg:gap-12" aria-busy={isPending}>
          <div>
            <ul className="divide-y border-y">
              {cart.items.map((item, index) => (
                <li key={`${item.productId}-${item.size}`} className="grid grid-cols-[80px_1fr] gap-4 py-6 sm:grid-cols-[96px_1fr_auto] sm:gap-6">
                  <Link href={`/product/${item.slug}`} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-contain" />
                  </Link>
                  <div className="min-w-0">
                    <Link href={`/product/${item.slug}`} className="text-sm font-medium leading-6 hover:underline sm:text-base">{item.name}</Link>
                    <p className="mt-2 text-xs text-muted-foreground">{t("Taille ", "Size ")}{item.size === "DOUBLEXL" ? "2XL" : item.size} · {formatCurrency(item.price, language)}{t(" / article", " / item")}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <Button variant="outline" size="icon" disabled={isPending} onClick={() => changeQuantity(index, true)} aria-label={`${t("Retirer", "Remove one")} ${item.name}`}><Minus strokeWidth={1.5} /></Button>
                      <span className="min-w-4 text-center text-sm tabular-nums" aria-live="polite">{item.qty}</span>
                      <Button variant="outline" size="icon" disabled={isPending} onClick={() => changeQuantity(index, false)} aria-label={`${t("Ajouter", "Add one")} ${item.name}`}><Plus strokeWidth={1.5} /></Button>
                    </div>
                  </div>
                  <p className="col-start-2 text-sm font-medium tabular-nums sm:col-start-auto sm:text-right">{formatCurrency(Number(item.price) * item.qty, language)}</p>
                </li>
              ))}
            </ul>
            <Link href="/" className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={16} strokeWidth={1.5} />{t("Continuer la collection", "Continue shopping")}</Link>
          </div>
          <aside className="rounded-xl border bg-card p-6">
            <h2 className="text-lg font-medium">{t("Votre commande", "Your order")}</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">{t("Articles", "Items")}</dt><dd className="tabular-nums">{formatCurrency(cart.itemsPrice, language)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted-foreground">{t("Livraison", "Shipping")}</dt><dd className="tabular-nums">{Number(cart.shippingPrice) === 0 ? t("Offerte", "Free") : formatCurrency(cart.shippingPrice, language)}</dd></div>
              <div className="flex justify-between gap-4 border-t pt-4 text-base font-medium"><dt>Total</dt><dd className="tabular-nums">{formatCurrency(cart.totalPrice, language)}</dd></div>
            </dl>
            <Button className="mt-6 h-12 w-full" disabled={isPending} onClick={() => router.push("/shipping-address")}>
              {isPending ? <Loader className="animate-spin" /> : <ArrowRight strokeWidth={1.5} />}{t("Passer commande", "Checkout")}
            </Button>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">{t("Adresse et mode de paiement à l’étape suivante", "Enter your address and choose a payment method next")}</p>
          </aside>
        </div>
      )}
    </section>
  );
}
