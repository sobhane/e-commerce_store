import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

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
