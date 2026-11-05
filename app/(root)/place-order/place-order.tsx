"use client";

import { useStoreText } from "@/components/shared/store-language-provider";
import { useRouter } from "next/navigation";
import { Check, Loader } from "lucide-react";
import { createOrder } from "@/lib/actions/order.actions";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";

export default function PlaceOrderForm() {
  const t = useStoreText();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isPending) return;
    setError("");
    startTransition(async () => {
      try {
        const result = await createOrder();
        if (result.redirectTo) router.push(result.redirectTo);
        else setError(result.message || t("La commande n’a pas pu être enregistrée. Réessayez", "We couldn’t place your order. Try again."));
      } catch {
        setError(t("La commande n’a pas pu être enregistrée. Réessayez", "We couldn’t place your order. Try again."));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4" aria-busy={isPending}>
      <Button type="submit" disabled={isPending} className="h-12 w-full">
        {isPending ? <Loader className="animate-spin" strokeWidth={1.5} /> : <Check strokeWidth={1.5} />}
        {isPending ? t("Enregistrement…", "Placing order…") : t("Confirmer la commande", "Place order")}
      </Button>
      {error && <p role="alert" className="text-sm leading-6 text-destructive">{error}</p>}
    </form>
  );
}
