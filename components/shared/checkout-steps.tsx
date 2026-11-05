import { getStoreText } from "@/lib/store-language.server";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function CheckoutSteps({ current = 0 }) {
  const t = await getStoreText();
  return (
    <nav aria-label={t("Étapes de commande", "Checkout steps")} className="mb-10 border-b pb-6 sm:mb-12">
      <ol className="grid grid-cols-4 gap-2 sm:gap-6">
        {[t("Connexion", "Sign in"), t("Livraison", "Shipping"), t("Paiement", "Payment"), t("Confirmation", "Review")].map((step, index) => (
          <li key={step} aria-current={index === current ? "step" : undefined} className={cn("flex flex-col items-start gap-2 border-t-2 pt-3 sm:flex-row sm:items-center sm:gap-3", index === current ? "border-brand text-foreground" : "border-border text-muted-foreground")}>
            <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs tabular-nums", index === current ? "bg-primary text-primary-foreground" : "bg-muted")}>
              {index < current ? <><Check size={16} strokeWidth={1.5} aria-hidden="true" /><span className="sr-only">{t("Terminée", "Complete")}</span></> : index + 1}
            </span>
            <span className="text-xs sm:text-sm">{step}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
