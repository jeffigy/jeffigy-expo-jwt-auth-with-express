import { showtimesTable } from "@/db/schema";

export type ShowtimeSelect = typeof showtimesTable.$inferSelect;
export type ShowtimeInsert = typeof showtimesTable.$inferInsert;
