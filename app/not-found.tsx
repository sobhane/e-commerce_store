"use client";

import { useStoreText } from "@/components/shared/store-language-provider";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  const t = useStoreText();
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 py-16 text-center">
      <Image src="/images/logo.jpg" alt={APP_NAME} height={80} width={80} className="mb-8 rounded-xl" />
      <p className="archive-rule">{t("Page introuvable", "Page not found")}</p>
      <h1 className="mb-4 mt-5 text-3xl font-medium">{t("Cette pièce manque à la collection", "This jersey is missing from the collection")}</h1>
      <p className="text-sm leading-7 text-muted-foreground">{t("Cette page n’existe pas ou n’est plus disponible", "This page may have moved or been removed")}</p>
      <Button asChild className="mt-8 h-12"><Link href="/">{t("Retour à la collection", "Back to the collection")}</Link></Button>
    </div>
  );
}
