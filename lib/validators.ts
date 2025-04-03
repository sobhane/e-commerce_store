import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characers").max(255),
  slug: z.string().min(3, "Slug must be at least 3 characers").max(255),
  category: z.string().min(3, "Category must be at least 3 characers").max(255),
  brand: z.string().min(3, "brand must be at least 3 characers").max(255),
  description: z
    .string()
    .min(7, "Description must be at least 7 characers")
    .max(255),
  stock: z.coerce.number().min(3, "Name must be at least 3 characers"),
  images: z.array(z.string().min(1, "Product must have a least one image")),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for signin users in

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for signup users in

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characers").max(50),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

// Cart Schema

export const insertCartSchema = z.object({
  productId: z.string().min(3, "Product ID must be at least 3 characers"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be at positive number"),
  image: z.string().min(1, "Image is required"),
  price: currency,
  size: z.enum(["S", "M", "L", "XL", "DOUBLEXL"]),
});

export const cartSchema = z.object({
  items: z.array(insertCartSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  sessionCartId: z.string().min(1, "Session ID is required"),
  userId: z.string().optional().nullable(),
});

//Schema for  the shipping address

export const shippingAdressSchema = z.object({
  fullName: z.string().min(3, "FullName must be at least 3 characters"),
  streetAddress: z
    .string()
    .min(3, "streetAdress must be at least 3 characters"),
  city: z.string().min(3, "city must be at least 3 characters"),
  phoneNumber: z.string().min(3, "phoneNumber must be at least 3 characters"),
});

//Schema for payment method

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

//Schema for inserting order

export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsprice: currency,
  shippingPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid payment method",
  }),
  shippingAdressSchema: shippingAdressSchema,
});

//Schema for inserting an order item

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  size: z.enum(["S", "M", "L", "XL", "DOUBLEXL"]),
  price: currency,
  qty: z.number(),
});
