import db from "@/db";
import { moviesTable } from "@/db/schema";
import { MovieInsert } from "@/types/movie.type";
import { eq } from "drizzle-orm";
import createError from "http-errors";

export const findAllMoviesService = async () => {
  return await db.select().from(moviesTable);
};

export const findMovieByIdService = async (id: string) => {
  const [movie] = await db
    .select()
    .from(moviesTable)
    .where(eq(moviesTable.movieId, id));

  if (!movie) {
    throw createError(404, "Movie not found");
  }

  return movie;
};

export const createMovieService = async (payload: MovieInsert) => {
  const [createdMovie] = await db
    .insert(moviesTable)
    .values({ ...payload })
    .returning();

  return createdMovie;
};

export const updateMovieService = async (id: string, payload: MovieInsert) => {
  await findMovieByIdService(id);

  const [updatedMovie] = await db
    .update(moviesTable)
    .set({ ...payload })
    .where(eq(moviesTable.movieId, id))
    .returning();

  return updatedMovie;
};

export const deleteMovieService = async (id: string) => {
  await findMovieByIdService(id);

  const [deletedMovie] = await db
    .delete(moviesTable)
    .where(eq(moviesTable.movieId, id))
    .returning();

  return deletedMovie;
};
