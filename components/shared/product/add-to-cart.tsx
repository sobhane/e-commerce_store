"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { CartItemSchema, CartSchema } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useTheme } from "next-themes";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { useTransition } from "react";
import { start } from "repl";

const AddToCart = ({
  item,
  cart,
}: {
  item: CartItemSchema;
  cart?: CartSchema;
}) => {
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

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast({
          title: "Error",
          description: res.message,
          duration: 5000,
          variant: "destructive",
        });
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
      const res = await removeItemFromCart(item.productId);
      if (!res.success) {
        toast({
          title: "Error",
          description: "Failed to remove item from cart",
          duration: 5000,
          variant: "destructive",
        });
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

    return;
  };
  const existItem =
    cart && cart.items.find((i) => i.productId === item.productId);

  return existItem ? (
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
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}{" "}
      Add to cart
    </Button>
  );
};

export default AddToCart;
