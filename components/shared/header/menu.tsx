import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="flex justify-end">
      <nav className="hidden md:flex w-full max-w">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href={`/cart`}>
            <ShoppingCart /> Cart
          </Link>
        </Button>
        <Button asChild >
          <Link href={`/sign-in`}>
            <UserIcon /> Sign In
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <ModeToggle />
              <Button asChild variant="ghost">
                <Link href={`/cart`}>
                  <ShoppingCart /> Cart
                </Link>
              </Button>
              <Button asChild>
                <Link href={`/sign-in`}>
                  <UserIcon /> Sign In
                </Link>
              </Button>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
