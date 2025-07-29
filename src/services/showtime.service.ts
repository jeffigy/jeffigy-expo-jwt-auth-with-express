import db from "@/db";
import { showtimesTable } from "@/db/schema";
import { ShowtimeInsert } from "@/types/showtime.type";
import { eq } from "drizzle-orm";
import { findMovieByIdService } from "@/services/movie.service";
import { findTheaterByIdService } from "@/services/theater.service";
import createError from "http-errors";

export const findAllShowtimesService = async () => {
  return await db.query.showtimesTable.findMany({
    with: {
      movie: true,
      theater: true,
    },
  });
};

export const findShowtimeByIdService = async (id: string) => {
  const showtime = await db.query.showtimesTable.findFirst({
    where: eq(showtimesTable.showtimeId, id),
    with: {
      movie: true,
      theater: true,
    },
  });

  if (!showtime) {
    throw createError(404, "Showtime not found");
  }

  return showtime;
};

export const createShowtimeService = async (payload: ShowtimeInsert) => {
  await Promise.all([
    findMovieByIdService(payload.movieId),
    findTheaterByIdService(payload.theaterId),
  ]);

  const [newShowtime] = await db
    .insert(showtimesTable)
    .values(payload)
    .returning();

  return newShowtime;
};

export const updateShowtimeService = async (
  id: string,
  payload: ShowtimeInsert
) => {
  await findShowtimeByIdService(id);

  await Promise.all([
    findMovieByIdService(payload.movieId),
    findTheaterByIdService(payload.theaterId),
  ]);

  const [updatedShowtime] = await db
    .update(showtimesTable)
    .set(payload)
    .where(eq(showtimesTable.showtimeId, id))
    .returning();

  return updatedShowtime;
};

export const deleteShowtimeService = async (id: string) => {
  await findShowtimeByIdService(id);

  const [deletedShowtime] = await db
    .delete(showtimesTable)
    .where(eq(showtimesTable.showtimeId, id))
    .returning();

  return deletedShowtime;
};
