import { reservationsTable } from "@/db/schema";

export type ReservationSelect = typeof reservationsTable.$inferSelect;
export type ReservationInsert = typeof reservationsTable.$inferInsert;
