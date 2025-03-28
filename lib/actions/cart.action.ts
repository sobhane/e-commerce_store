"use server";
import { CartItemSchema } from "@/types";
import { cookies } from "next/headers";
import { formatErrors, prismaToJS, round2 } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartSchema, insertCartSchema } from "../validators";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// Calculate cart prices
const calcPrice = (items: CartItemSchema[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(Number(itemsPrice) > 150 ? 0 : 30),
    totalPrice = round2(Number(itemsPrice) + Number(shippingPrice));

  return {
    itemsPrice: itemsPrice?.toString(),
    shippingPrice: shippingPrice?.toString(),
    totalPrice: totalPrice?.toString(),
  };
};

export async function addItemToCart(data: CartItemSchema) {
  try {
    //Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart not found");

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
    if (!product) throw new Error("Product not found");
    if (!cart) {
      //Create new cart
      const newCart = cartSchema.parse({
        items: [item],
        ...calcPrice([item]),
        sessionCartId,
        userId,
      });

      await prisma.cart.create({
        data: newCart,
      });

      //revalidate Product page
      revalidatePath(`/product/${product.slug}`);

      return { success: true, message: `${product.name} added to cart` };
    } else {
      const existItem = (cart.items as CartItemSchema[]).find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        console.log(1);
        if (product.stock < existItem.qty + 1) {
          throw new Error("Product out of stock");
        }
        (cart.items as CartItemSchema[]).find(
          (x) => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        //If item does not exist in cart
        // Check the stock
        if (product.stock < 1) {
          throw new Error("Not enough stock");
        }

        // Add item to cart
        (cart.items as CartItemSchema[]).push(item);
      }
      //Save cart to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItemSchema[]),
        },
      });
      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${
          existItem ? "updated in" : "added to"
        } cart`,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: formatErrors(error) };
  }
}

export async function getMyCart() {
  //Check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart not found");

  //Get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  //Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId: sessionCartId },
  });
  if (!cart) return undefined;

  //Convert decimals and return
  return prismaToJS({
    ...cart,
    items: cart.items as CartItemSchema[],
    itemsPrice: cart.itemsPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
  })  ;
}

export async function removeItemFromCart(productId: string) {
  try {
    //Check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart not found");

    //Get product from database
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new Error("Product not found");

    //Get user cart from database
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    //Check if item exists in cart
    const exist = (cart.items as CartItemSchema[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("Item not found in cart");

    if (exist.qty === 1) {
      //Remove from cart
      cart.items = (cart.items as CartItemSchema[]).filter(
        (x) => x.productId !== productId
      );
    } else {
      //Decrease qty
      (cart.items as CartItemSchema[]).find(
        (x) => x.productId === productId
      )!.qty = exist.qty - 1;
    }
    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItemSchema[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return { success: true, message: `${product.name} removed from cart` };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}
