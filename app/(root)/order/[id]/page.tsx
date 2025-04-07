import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAdress } from "@/types";

export const metadata: Metadata = {
  title: "Order Details",
  description: "Order details page",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <>
      <OrderDetailsTable
        order={{
          ...order,
          shippingAddress: order.shippingAddress as ShippingAdress,
        }}
      />
    </>
  );
};

export default OrderDetailsPage;
