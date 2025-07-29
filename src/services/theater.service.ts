import db from "@/db";
import { theatersTable } from "@/db/schema";
import { TheaterInsert } from "@/types/theater.type";
import { eq } from "drizzle-orm";
import createError from "http-errors";

export const findAllTheatersService = async () => {
  return await db.select().from(theatersTable);
};

export const findTheaterByIdService = async (id: string) => {
  const [theater] = await db
    .select()
    .from(theatersTable)
    .where(eq(theatersTable.theaterId, id));

  if (!theater) {
    throw createError(404, "Theater not found");
  }

  return theater;
};

export const createTheaterService = async (payload: TheaterInsert) => {
  const [createdTheater] = await db
    .insert(theatersTable)
    .values({ ...payload })
    .returning();

  return createdTheater;
};

export const updateTheaterService = async (
  id: string,
  payload: TheaterInsert
) => {
  await findTheaterByIdService(id);

  const [updatedTheater] = await db
    .update(theatersTable)
    .set({ ...payload })
    .where(eq(theatersTable.theaterId, id))
    .returning();

  return updatedTheater;
};

export const deleteTheaterService = async (id: string) => {
  await findTheaterByIdService(id);

  const [deletedTheater] = await db
    .delete(theatersTable)
    .where(eq(theatersTable.theaterId, id))
    .returning();

  return deletedTheater;
};
