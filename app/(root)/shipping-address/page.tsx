import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAdress } from "@/types";
import { getUserById } from "@/lib/actions/user.action";
import ShippingAddressForm from "./shipping-address-form";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Shipping Address",
};
const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error('No user ID');

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1}/>
      <ShippingAddressForm address={user.address as ShippingAdress} />
    </>
  );
};

export default ShippingAddressPage;
