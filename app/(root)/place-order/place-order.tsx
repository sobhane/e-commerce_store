"use client";

import { useRouter } from "next/navigation";
import { Check, Loader } from "lucide-react";
import { createOrder } from "@/lib/actions/order.actions";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const PlaceOrderForm = () => {
  const router = useRouter();

  const PlaceOrderButton = () => {
    const { pending, action } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full">
        {pending ? (
          <Loader className=" w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" size={16} />
        )} {" "} Place Order
      </Button>
    );
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await createOrder();
    if(res.redirectTo) {
      router.push(res.redirectTo);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;
