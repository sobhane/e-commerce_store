import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();
  await prisma.cart.deleteMany();
  console.log("Database seeded successfully");
}

main();
