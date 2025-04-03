import { z } from "zod";
import {
  cartSchema,
  insertProductSchema,
  insertCartSchema,
  shippingAdressSchema,
  insertOrderItemSchema,
  insertOrderSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type CartSchema = z.infer<typeof cartSchema>;
export type CartItemSchema = z.infer<typeof insertCartSchema>;
export type ShippingAdress = z.infer<typeof shippingAdressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  DeliveredAt: Date | null;
  orderItems: OrderItem[];
  user: { name: string; email: string };
};
