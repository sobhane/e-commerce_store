"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatErrors, prismaToJS } from "../utils";
import { auth } from "@/auth";
import { getMyCart } from "./cart.action";
import { getUserById } from "./user.action";
import { insertOrderSchema } from "../validators";
import { prisma } from "@/db/prisma";
import { CartItemSchema } from "@/types";
import { PAGE_SIZE } from "../constants";

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

    const insertedOrderId = await prisma.$transaction(async (tx) => {
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

      //Clear the cart after creating the order
      await tx.cart.update({
        where: { id: cart.id },
        data: { items: [], itemsPrice: 0, shippingPrice: 0, totalPrice: 0 },
      });
      return insertedOrder.id;
    });

    if (!insertedOrderId) throw new Error("Order not created");

    return {
      seccess: true,
      message: "Order created successfully",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, error: formatErrors(error) };
  }
};

// Get order by ID
export const getOrderById = async (orderId: string) => {
  const data = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });
  return prismaToJS(data);
};

// Get user's orders
export const getMyOrders = async ({
  limit = PAGE_SIZE,
  page,
}: {
  page: number;
  limit?: number;
}) => {
  const session = await auth();
  if (!session) throw new Error("User is not authenticated");

  const userId = session?.user?.id;
  if (!userId) throw new Error("User ID not found");

  const data = await prisma.order.findMany({
    where: { userId },
    include: { orderitems: true },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.order.count({
    where: { userId },
  });
  return {
    data: prismaToJS(data),
    totalPages: Math.ceil(dataCount / limit),
  };
};
