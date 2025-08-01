import { z } from "zod";

export const CartItemSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  description: z.string().optional(),
  quantityInCart: z.number().int().min(1),
  quantity: z.number().int().min(1),
});

export const OrderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  items: z.array(CartItemSchema).min(1, "Cart cannot be empty"),
  total: z.number().min(0, "Total must be positive"),
});

