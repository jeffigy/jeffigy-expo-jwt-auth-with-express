import { theatersTable } from "@/db/schema";

export type TheaterSelect = typeof theatersTable.$inferSelect;
export type TheaterInsert = typeof theatersTable.$inferInsert;
