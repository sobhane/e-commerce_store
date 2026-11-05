import { getStoreText } from "@/lib/store-language.server";
import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { Menu as MenuIcon, ShoppingBag } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UserButton from "./user-button";

const Menu = async () => {
  const t = await getStoreText();
  return (
    <div className="flex items-center gap-2">
      <nav aria-label={t("Compte et panier", "Account and cart")} className="hidden items-center gap-2 md:flex">
        <ModeToggle />
        <Button asChild variant="ghost"><Link href="/cart"><ShoppingBag strokeWidth={1.5} />{t("Panier", "Cart")}</Link></Button>
        <UserButton />
      </nav>
      <nav aria-label={t("Navigation mobile", "Mobile navigation")} className="flex items-center gap-2 md:hidden">
        <Button asChild variant="ghost" size="icon"><Link href="/cart" aria-label={t("Panier", "Cart")}><ShoppingBag strokeWidth={1.5} /></Link></Button>
        <Sheet>
          <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label={t("Ouvrir le menu", "Open menu")}><MenuIcon strokeWidth={1.5} /></Button></SheetTrigger>
          <SheetContent className="flex flex-col items-start gap-6 bg-background p-6">
            <SheetTitle className="font-medium">Koora Clothes</SheetTitle>
            <SheetDescription>{t("Votre collection, votre compte et votre panier", "Browse the collection, your account, and your cart")}</SheetDescription>
            <SheetClose asChild><Link href="/" className="archive-rule min-h-10">{t("La collection", "Collection")}</Link></SheetClose>
            <SheetClose asChild><Button asChild variant="ghost"><Link href="/cart"><ShoppingBag strokeWidth={1.5} />{t("Panier", "Cart")}</Link></Button></SheetClose>
            <UserButton />
            <ModeToggle />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
