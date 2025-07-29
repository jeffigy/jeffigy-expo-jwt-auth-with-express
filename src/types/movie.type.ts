import { moviesTable } from "@/db/schema";

export type MovieSelect = typeof moviesTable.$inferSelect;
export type MovieInsert = typeof moviesTable.$inferInsert;
