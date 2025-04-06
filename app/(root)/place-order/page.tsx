import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyCart } from "@/lib/actions/cart.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatCurrency } from "@/lib/utils";
import { ShippingAdress } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PlaceOrderForm from "./place-order";

export const metadata: Metadata = {
  title: "Place Order",
  description: "Place your order",
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userid = session?.user?.id;

  if (!userid) throw new Error("User not found");

  const user = await getUserById(userid);

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as ShippingAdress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className="py-4 text-2xl">Place Order</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="md:col-span-2 overflow-x-auto space-y-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress}, {userAddress.city},{" "}
                {userAddress.phoneNumber}
              </p>
              <div className="mt-3 flex justify-end">
                <Link href="/shipping-address" className="text-blue-500">
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p>{user.paymentMethod}</p>

              <div className="mt-3 flex justify-end">
                <Link href="/payment-methods" className="text-blue-500">
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell className="">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center space-x-2"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded-md"
                          />
                          <span className="ml-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>{item.qty}</TableCell>
                      <TableCell>{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-3 flex justify-end">
                <Link href="/payment-methods" className="text-blue-500">
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card >
            <CardContent className="p-4 gap-4 space-y-4">
                <div className="flex justify-between">
                    <div>Items</div>
                    <div>{formatCurrency(cart.itemsPrice)}</div>
                </div>
                <div className="flex justify-between">
                    <div>Shipping Price</div>
                    <div>{formatCurrency(cart.shippingPrice)}</div>
                </div>
                <div className="flex justify-between">
                    <div>Total</div>
                    <div>{formatCurrency(cart.totalPrice)}</div>
                </div>
                <PlaceOrderForm/>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
