"use client";

import { useStoreText } from "@/components/shared/store-language-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader, ShoppingBag } from "lucide-react";
import { CartItemSchema, CartSchema } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { useState, useTransition } from "react";
import Sizes from "./Size";

export default function AddToCart({ item, cart }: { item: CartItemSchema; cart?: CartSchema }) {
  const t = useStoreText();
  const [size, setSize] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const existingItem = cart?.items.find((entry) => entry.productId === item.productId);

  function updateCart(remove = false) {
    if (!size || isPending) return;
    startTransition(async () => {
      const result = remove
        ? await removeItemFromCart(item.productId, size)
        : await addItemToCart({ ...item, size: size as CartItemSchema["size"] }, size);
      toast({
        title: result.success ? (remove ? t("Panier mis à jour", "Cart updated") : t("Maillot ajouté au panier", "Jersey added to your cart")) : t("Impossible de modifier le panier", "Couldn’t update your cart"),
        description: result.success ? item.name : result.message,
        variant: result.success ? "default" : "destructive",
        action: result.success ? <ToastAction altText={t("Voir le panier", "View cart")} onClick={() => router.push("/cart")}>{t("Voir le panier", "View cart")}</ToastAction> : undefined,
      });
    });
  }

  return (
    <div className="space-y-5" aria-busy={isPending}>
      <Sizes value={size} setSize={setSize} disabled={isPending} />
      <p className="text-xs text-muted-foreground" aria-live="polite">{size ? `${t("Taille sélectionnée", "Selected size")}: ${size === "DOUBLEXL" ? "2XL" : size}` : t("Sélectionnez votre taille pour ajouter ce maillot au panier", "Choose a size to add this jersey to your cart")}</p>
      {existingItem && size ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border p-3">
          <span className="text-sm">{t("Dans votre panier", "In your cart")}</span>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" disabled={isPending} onClick={() => updateCart(true)} aria-label={t("Retirer un maillot", "Remove one jersey")}><Minus strokeWidth={1.5} /></Button>
            <span className="min-w-4 text-center text-sm tabular-nums" aria-live="polite">{existingItem.qty}</span>
            <Button variant="outline" size="icon" disabled={isPending} onClick={() => updateCart()} aria-label={t("Ajouter un maillot", "Add one jersey")}><Plus strokeWidth={1.5} /></Button>
          </div>
        </div>
      ) : (
        <Button className="h-12 w-full" disabled={!size || isPending} onClick={() => updateCart()}>
          {isPending ? <Loader className="animate-spin" strokeWidth={1.5} /> : <ShoppingBag strokeWidth={1.5} />}{t("Ajouter au panier", "Add to cart")}
        </Button>
      )}
    </div>
  );
}
