import { getStoreText } from "@/lib/store-language.server";
import LanguageSwitch from "@/components/shared/language-switch";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default async function StoreHeader({ children }: { children: React.ReactNode }) {
  const t = await getStoreText();
  return (
    <header className="border-b bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:block focus:p-4">{t("Aller au contenu", "Skip to content")}</a>
      <div className="wrapper flex min-h-[72px] items-center justify-between gap-4 py-3 sm:min-h-20">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={`${APP_NAME} — ${t("accueil", "home")}`}>
          <Image src="/images/logo.jpg" alt="" height={40} width={40} className="size-10 shrink-0 rounded-md" />
          <div className="min-w-0">
            <span className="block text-base font-medium sm:text-lg">{APP_NAME}</span>
            <span className="mt-1 hidden text-xs text-muted-foreground sm:block">{t("La culture du maillot", "Football jersey culture")}</span>
          </div>
        </Link>
        <div className="flex shrink-0 items-center gap-1 md:gap-4">
          <Link href="/" className="hidden py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:block">{t("La collection", "Collection")}</Link>
          <LanguageSwitch />
          {children}
        </div>
      </div>
    </header>
  );
}
