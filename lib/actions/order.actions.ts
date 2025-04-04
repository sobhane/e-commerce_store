"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatErrors } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.action";
import { getUserById } from "./user.action";
import { insertOrderSchema, insertOrderItemSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItemSchema } from "@/types";

// Create order and create order items
export const createOrder = async () => {
  try {
    const session = await auth();

    if (!session) throw new Error("User is not authenticated");

    const cart = await getMyCart();
    const userId = session?.user?.id;

    if (!userId) throw new Error("User ID not found");

    const user = await getUserById(userId);

    if (!cart || cart.items.length === 0) {
      return { success: false, error: "Cart is empty", redirectTo: "/cart" };
    }

    if (!user.address) {
      return {
        success: false,
        error: "No shipping address",
        redirectTo: "/shipping-address",
      };
    }

    if (!user.paymentMethod) {
      return {
        success: false,
        error: "No payment method",
        redirectTo: "/payment-methods",
      };
    }

    //Create order object
    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingAddress: user.address,
      paymentMethod: user.paymentMethod,
      itemPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    });
    
    //Create transaction to create order and oder items in database

    await prisma.$transaction(async (tx) => {
      const insertedOrder = await tx.order.create({
        data: order,
      });

      //Create order items from the cart items
      for (const item of cart.items as CartItemSchema[]) {
        await tx.orderItem.create({
          data: {
            ...item,
            price: item.price,
            orderId: insertedOrder.id,
          },
        });
      }
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, error: formatErrors(error) };
  }
};
