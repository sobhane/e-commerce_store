"use client";

import { useStoreLanguage } from "@/components/shared/store-language-provider";
import { storeText } from "@/lib/store-language";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import {
  updateOrderToPaidCOD,
  DeliverOrder,
} from "@/lib/actions/order.actions";

const OrderDetailsTable = ({
  order,
  isAdmin,
}: {
  order: Order;
  isAdmin: boolean;
}) => {
  const language = useStoreLanguage();
  const t = storeText(language);
  const {
    id,
    shippingAddress,
    orderitems,
    itemPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    DeliveredAt,
    paymentMethod,
  } = order;

  const MarkAsPaidButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id);
            toast({
              variant: res.success ? "default" : "destructive",
              description: res.message,
            });
          })
        }
      >
        {isPending ? t("Enregistrement…", "Saving…") : t("Marquer comme payée", "Mark as paid")}
      </Button>
    );
  };

  const MarkAsDeliveredButton = () => {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    return (
      <Button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await DeliverOrder(order.id);
            toast({
              variant: res.success ? "default" : "destructive",
              description: res.message,
            });
          })
        }
      >
        {isPending ? t("Enregistrement…", "Saving…") : t("Marquer comme livrée", "Mark as delivered")}
      </Button>
    );
  };

  return (
    <>
      <h1 className="mb-8 text-3xl font-medium">{t("Commande", "Order")} {formatId(id)}</h1>
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl pb-4">{t("Mode de paiement", "Payment method")}</h2>
              <p className="mb-2">{paymentMethod === "CashOnDelivery" ? t("Paiement à la livraison", "Cash on delivery") : paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  {t("Payée le ", "Paid on ")}{formatDateTime(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="outline">{t("En attente de paiement", "Awaiting payment")}</Badge>
              )}
            </CardContent>
          </Card>
          <Card className="">
            <CardContent className="p-6">
              <h2 className="text-xl pb-4">{t("Adresse de livraison", "Shipping address")}</h2>
              <p>{shippingAddress.fullName}</p>
              <p className="mb-2">
                {shippingAddress.streetAddress}, {shippingAddress.city} ,{" "}
                {shippingAddress.phoneNumber}
              </p>
              {isDelivered ? (
                <Badge variant="secondary">
                  {t("Livrée le ", "Delivered on ")}{formatDateTime(DeliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="outline">{t("En attente de livraison", "Awaiting delivery")}</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl pb-4">{t("Vos maillots", "Your jerseys")}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("Article", "Item")}</TableHead>
                    <TableHead>{t("Quantité", "Quantity")}</TableHead>
                    <TableHead>{t("Taille", "Size")}</TableHead>
                    <TableHead>{t("Prix", "Price")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.size === "DOUBLEXL" ? "2XL" : item.size}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-right">{formatCurrency(item.price, language)}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className="space-y-4 p-6 tabular-nums">
              <div className="flex justify-between">
                <div>{t("Articles", "Items")}</div>
                <div>{formatCurrency(itemPrice, language)}</div>
              </div>

              <div className="flex justify-between">
                <div>{t("Livraison", "Shipping")}</div>
                <div>{formatCurrency(shippingPrice, language)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(totalPrice, language)}</div>
              </div>
              {/* Cash On delivery */}
              {isAdmin && !isPaid && paymentMethod === "CashOnDelivery" && (
                <MarkAsPaidButton />
              )}
              {isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
