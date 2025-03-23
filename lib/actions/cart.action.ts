"use server";
import { CartItemSchema ,CartSchema } from "@/types";
import { cookies } from "next/headers";
import { formatErrors, prismaToJS } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { insertCartSchema } from "../validators";

export async function addItemToCart(data: CartItemSchema) {

  try {
    //Check for cart cookie
    const seesionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!seesionCartId) throw new Error("Cart not found");

    //Get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    //Get cart from database
    const cart = await getMyCart();
    // console.log(cart);

    // Parse and validate item
    const item = insertCartSchema.parse(data);

    // Find product in database
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    // Testing
    console.log({
      "Session Cart Id": seesionCartId,
      "User Id": userId,
      "Item Requested": item,
      "Product Found": product,
    });

    return { success: true, message: "Item added to cart" };
  } catch (error) {
    console.log(error)
    return { success: false, message: formatErrors(error) };
  }
}

export async function getMyCart() {
  //Check for cart cookie
  const seesionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!seesionCartId) throw new Error("Cart not found");

  //Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  //Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId: seesionCartId },
  });
  if (!cart) return undefined;

  //Convert decimals and return
  return prismaToJS({
    ...cart,
    items: cart.items as CartItemSchema[],
    itemsPrice: cart.itemsPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
  });
}
