"use client";

import { useStoreText } from "@/components/shared/store-language-provider";
import { Loader } from "lucide-react";

export default function LoadingPage() {
  const t = useStoreText();
  return (
    <div role="status" className="flex min-h-64 items-center justify-center gap-3 px-4 py-16 text-sm text-muted-foreground">
      <Loader size={16} strokeWidth={1.5} className="animate-spin" aria-hidden="true" />{t("Chargement de la collection…", "Loading the collection…")}
    </div>
  );
}
