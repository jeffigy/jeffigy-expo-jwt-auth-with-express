import { isCuid } from "@paralleldrive/cuid2";
import z from "zod";

export const getId = z.object({
  id: z.string().refine(isCuid, {
    message: "Invalid ID",
  }),
});

export const getParamsId = z.object({
  params: getId,
});

export type GetId = z.infer<typeof getParamsId>;
