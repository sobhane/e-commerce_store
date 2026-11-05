import { getStoreText } from "@/lib/store-language.server";
import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAdress } from "@/types";
import { auth } from "@/auth";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getStoreText();
  return { title: t("Détails de la commande", "Order details"), description: t("Suivez votre commande Koora Clothes", "Track your Koora Clothes order") };
}

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const session = await auth();

  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAdress,
        }}
        isAdmin={session?.user.role === "admin" || false}
      />
    </>
  );
};

export default OrderDetailsPage;
