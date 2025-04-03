"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { CartItemSchema, CartSchema } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useTheme } from "next-themes";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { useState, useTransition } from "react";
import Sizes from "./Size";

enum sizes {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  DOUBLEXL = "DOUBLEXL",
}
const AddToCart = ({
  item,
  cart,
}: {
  item: CartItemSchema;
  cart?: CartSchema;
}) => {
  const [size, setSize] = useState("");

  const { theme } = useTheme();
  let stylecss = "";

  if (theme === "light") {
    stylecss = "bg-primary text-white hover:bg-primary-600";
  } else if (theme === "dark") {
    stylecss = "bg-primary text-black hover:bg-primary-600";
  } else {
    stylecss = "";
  }

  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
  if (size) {
    item.size = size as sizes;
  }
  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item, size);

      if (!res.success) {
        toast({
          title: "Error",
          description: res.message,
          duration: 5000,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Added to cart",
        description: res.message,
        duration: 5000,
        action: (
          <ToastAction
            className={stylecss}
            altText="Go to cart"
            onClick={() => router.push("/cart")}
          >
            Go to cart
          </ToastAction>
        ),
      });
    });
  };

  //Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId, size);
      if (!res.success) {
        toast({
          title: "Error",
          description: "Failed to remove item from cart",
          duration: 5000,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "removed from cart",
        description: res.message,
        duration: 5000,
        action: (
          <ToastAction
            className={stylecss}
            altText="Go to cart"
            onClick={() => router.push("/cart")}
          >
            Go to cart
          </ToastAction>
        ),
      });
    });

    return;
  };
  const existItem =
    cart && cart.items.find((i) => i.productId === item.productId);

    console.log(size)
  if (size === "") {
    return <Sizes setSize={setSize} />;
  }
  return existItem ? (
    <>
      <div className="my-3">
        <Sizes setSize={setSize} />
      </div>
      <div className="flex gap-2">
        <Button className="w-full" type="button" onClick={handleRemoveFromCart}>
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Minus className="h-4 w-4" />
          )}
        </Button>
        <span className="px-2">{existItem.qty}</span>
        <Button className="w-full" type="button" onClick={handleAddToCart}>
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>
    </>
  ) : (
    <>
      <div className="my-3">
        <Sizes setSize={setSize} />
      </div>
      <Button className="w-full" type="button" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}{" "}
        Add to cart
      </Button>
    </>
  );
};

export default AddToCart;
