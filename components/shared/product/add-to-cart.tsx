"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { CartItemSchema } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart } from "@/lib/actions/cart.action";
import { useTheme } from "next-themes";

const AddToCart = ({ item }: { item: CartItemSchema }) => {
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

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      return toast({
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
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add to cart
    </Button>
  );
};

export default AddToCart;
