import { cn, formatCurrency } from "@/lib/utils";
import { getStoreLanguage } from "@/lib/store-language.server";

export default async function ProductPrice({ value, className }: { value: string; className?: string }) {
  const language = await getStoreLanguage();
  return <p className={cn("whitespace-nowrap text-base font-medium tabular-nums", className)}>{formatCurrency(value, language)}</p>;
}
