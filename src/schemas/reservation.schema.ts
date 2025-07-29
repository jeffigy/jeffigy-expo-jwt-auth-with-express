import z from "zod";
import { getId } from ".";
import { isCuid } from "@paralleldrive/cuid2";

const payload = z.object({
  showtimeId: z
    .string({
      required_error: "Showtime ID is required",
      invalid_type_error: "Showtime ID must be a string",
    })
    .refine(isCuid, {
      message: "Invalid ID",
    }),
  seatNumbers: z
    .array(
      z.string({
        invalid_type_error: "Seat number must be a string",
      }),
      {
        required_error: "Seat numbers property is required",
        invalid_type_error: "Seat numbers must be an array",
      }
    )
    .min(1, {
      message: "Seat number contain at least 1 Seat number",
    }),
});

export const createReservationSchema = z.object({
  body: payload,
});

export const updateReservationSchema = z.object({
  body: payload,
  params: getId,
});

export type CreateReservation = z.infer<typeof createReservationSchema>;
export type UpdateReservation = z.infer<typeof updateReservationSchema>;
