import z from "zod";
import { getId } from ".";

const payload = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: "Name is required",
    })
    .min(1, { message: "Name must contain at least 1 character" }),
  location: z
    .string({
      invalid_type_error: "Location must be a string",
      required_error: "Location is required",
    })
    .min(1, { message: "Location must contain at least 1 character" }),
  seatCapacity: z
    .number({
      invalid_type_error: "Seat Capacity must be a number",
      required_error: "Seat Capacity is required",
    })
    .min(1),
});

export const createTheaterSchema = z.object({
  body: payload,
});

export const updateTheaterSchema = z.object({
  body: payload,
  params: getId,
});

export type CreateTheater = z.infer<typeof createTheaterSchema>;
export type UpdateTheater = z.infer<typeof updateTheaterSchema>;
