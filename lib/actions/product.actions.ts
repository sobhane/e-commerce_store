"use server";
import { prisma } from "@/db/prisma"
import { prismaToJS } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";


export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });
  return prismaToJS(data);
}
