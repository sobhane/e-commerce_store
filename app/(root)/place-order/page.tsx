import { getStoreLanguage, getStoreText } from "@/lib/store-language.server";
import { storeText } from "@/lib/store-language";
import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Button } from "@/components/ui/button";
import { getMyCart } from "@/lib/actions/cart.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatCurrency } from "@/lib/utils";
import { ShippingAdress } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PlaceOrderForm from "./place-order";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getStoreText();
  return { title: t("Vérifier la commande", "Review order") };
}

export default async function PlaceOrderPage() {
  const language = await getStoreLanguage();
  const t = storeText(language);
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-methods");
  const address = user.address as ShippingAdress;

  return (
    <>
      <CheckoutSteps current={3} />
      <p className="archive-rule">{t("Dernière étape", "Final step")}</p>
      <h1 className="mb-8 mt-4 text-3xl font-medium sm:text-4xl">{t("Vérifier la commande", "Review order")}</h1>
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
        <div className="min-w-0 space-y-6">
          <section className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-medium">{t("Adresse de livraison", "Shipping address")}</h2>
              <Button asChild variant="link" className="h-auto p-0"><Link href="/shipping-address">{t("Modifier", "Edit")}</Link></Button>
            </div>
            <p className="text-sm leading-7">{address.fullName}</p>
            <p className="text-sm leading-7 text-muted-foreground">{address.streetAddress}, {address.city}</p>
            <p className="text-sm leading-7 tabular-nums text-muted-foreground">{address.phoneNumber}</p>
          </section>
          <section className="rounded-xl border bg-card p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-medium">{t("Mode de paiement", "Payment method")}</h2>
              <Button asChild variant="link" className="h-auto p-0"><Link href="/payment-methods">{t("Modifier", "Edit")}</Link></Button>
            </div>
            <p className="text-sm text-muted-foreground">{user.paymentMethod === "CashOnDelivery" ? t("Paiement à la livraison", "Cash on delivery") : user.paymentMethod}</p>
          </section>
          <section className="rounded-xl border bg-card p-6">
            <h2 className="mb-4 text-lg font-medium">{t("Vos maillots", "Your jerseys")}</h2>
            <ul className="divide-y">
              {cart.items.map((item) => (
                <li key={`${item.productId}-${item.size}`} className="flex items-start gap-4 py-4">
                  <Link href={`/product/${item.slug}`} className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-contain" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${item.slug}`} className="text-sm font-medium hover:underline">{item.name}</Link>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{t("Taille ", "Size ")}{item.size === "DOUBLEXL" ? "2XL" : item.size}{t(" · Quantité ", " · Quantity ")}{item.qty}</p>
                    <p className="mt-2 text-sm tabular-nums">{formatCurrency(Number(item.price) * item.qty, language)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-medium">{t("Récapitulatif", "Order summary")}</h2>
          <dl className="my-6 space-y-4 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">{t("Articles", "Items")}</dt><dd className="tabular-nums">{formatCurrency(cart.itemsPrice, language)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">{t("Livraison", "Shipping")}</dt><dd className="tabular-nums">{Number(cart.shippingPrice) === 0 ? t("Offerte", "Free") : formatCurrency(cart.shippingPrice, language)}</dd></div>
            <div className="flex justify-between gap-4 border-t pt-4 text-base font-medium"><dt>Total</dt><dd className="tabular-nums">{formatCurrency(cart.totalPrice, language)}</dd></div>
          </dl>
          <PlaceOrderForm />
        </aside>
      </div>
    </>
  );
}
