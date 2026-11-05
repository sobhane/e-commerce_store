import { getStoreText } from "@/lib/store-language.server";
import { Metadata } from "next";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.action";
import PaymentMethodForm from "./payment-method-form";
import CheckoutSteps from "@/components/shared/checkout-steps";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getStoreText();
  return { title: t("Mode de paiement", "Payment method") };
}

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  return <>
  <CheckoutSteps current={2}/>
  <PaymentMethodForm preferredPaymentMethod={user.paymentMethod}/>
  </>;
};

export default PaymentMethodPage;
