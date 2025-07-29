import z from "zod";
import { getId, getParamsId } from ".";
import { isCuid } from "@paralleldrive/cuid2";

const payload = z.object({
  startTime: z.coerce.date({
    required_error: "Start time is required",
    invalid_type_error: "Invalid date format",
  }),
  endTime: z.coerce.date({
    required_error: "End time is required",
    invalid_type_error: "Invalid date format",
  }),
  theaterId: z
    .string({
      invalid_type_error: "Theater Id must be a string",
      required_error: "Theater Id is required",
    })
    .refine(isCuid, {
      message: "Invalid ID",
    }),
  movieId: z
    .string({
      invalid_type_error: "Movie Id must be a string",
      required_error: "Movie Id is required",
    })
    .refine(isCuid, {
      message: "Invalid ID",
    }),
});

export const createShowtimeSchema = z.object({
  body: payload,
});

export const updateShowtimeSchema = z.object({
  body: payload,
  params: getId,
});

export type CreateShowtime = z.infer<typeof createShowtimeSchema>;
export type UpdateShowtime = z.infer<typeof updateShowtimeSchema>;
