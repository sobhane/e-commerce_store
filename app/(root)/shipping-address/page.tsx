import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.action";
import { getStoreText } from "@/lib/store-language.server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAdress } from "@/types";
import { getUserById } from "@/lib/actions/user.action";
import ShippingAddressForm from "./shipping-address-form";
import CheckoutSteps from "@/components/shared/checkout-steps";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getStoreText();
  return { title: t("Adresse de livraison", "Shipping address") };
}
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
