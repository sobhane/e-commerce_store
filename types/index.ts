import { z } from "zod";
import {
  cartSchema,
  insertProductSchema,
  insertCartSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type CartSchema = z.infer<typeof cartSchema>;
export type CartItemSchema = z.infer<typeof insertCartSchema>;
