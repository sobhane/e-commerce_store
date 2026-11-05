import { getStoreText } from "@/lib/store-language.server";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default async function Footer() {
  const t = await getStoreText();
  return (
    <footer className="border-t bg-card">
      <div className="wrapper flex flex-col justify-between gap-6 py-8 sm:flex-row sm:items-center">
        <div>
          <Link href="/" className="text-base font-medium">{APP_NAME}</Link>
          <p className="mt-2 text-sm text-muted-foreground">{t("La culture du maillot", "Football jersey culture")}</p>
        </div>
        <Link href="/" className="text-link w-fit text-sm">{t("La collection", "Collection")}</Link>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {APP_NAME} · {t("Tous droits réservés", "All rights reserved")}</p>
      </div>
    </footer>
  );
}
