import z from "zod";
import { getId } from ".";

const payload = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be a string",
      required_error: "Title is required",
    })
    .min(1, { message: "Title must contain at least 1 character" }),
  description: z
    .string({
      invalid_type_error: "Description must be a string",
      required_error: "Description is required",
    })
    .min(1, { message: "Description must contain at least 1 character" }),
  duration: z
    .number({
      invalid_type_error: "Duration must be a number",
      required_error: "Duration is required",
    })
    .min(1),
  genre: z
    .array(z.string({ invalid_type_error: "Each genre must be a string" }), {
      required_error: "Genre is required",
      invalid_type_error: "Genre must be a list strings",
    })
    .min(1, { message: "Genre must contain at least 1 value" }),
});

export const createMovieSchema = z.object({
  body: payload,
});

export const updateMovieSchema = z.object({
  body: payload,
  params: getId,
});

export type CreateMovie = z.infer<typeof createMovieSchema>;
export type UpdateMovie = z.infer<typeof updateMovieSchema>;
