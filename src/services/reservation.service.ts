import db from "@/db";
import { reservationsTable } from "@/db/schema";
import { ReservationInsert } from "@/types/reservation.type";
import { eq } from "drizzle-orm";
import { findShowtimeByIdService } from "./showtime.service";
import createError from "http-errors";

export const findAllReservationsService = async (id: string) => {
  return await db.query.reservationsTable.findMany({
    where: eq(reservationsTable.userId, id),
    with: {
      user: true,
      showtime: true,
    },
  });
};

export const findReservationByIdService = async (id: string) => {
  const reservation = await db.query.reservationsTable.findFirst({
    where: eq(reservationsTable.reservationId, id),
    with: {
      user: true,
      showtime: true,
    },
  });

  if (reservation) {
    throw createError(404, "Reservation not found");
  }

  return reservation;
};

export const createReservationService = async (payload: ReservationInsert) => {
  await findShowtimeByIdService(payload.showtimeId);

  const [createdReservation] = await db
    .insert(reservationsTable)
    .values(payload)
    .returning();

  return createdReservation;
};

export const updateReservationService = async (
  id: string,
  payload: ReservationInsert
) => {
  await findShowtimeByIdService(payload.showtimeId);

  const [updatedReservation] = await db
    .update(reservationsTable)
    .set(payload)
    .where(eq(reservationsTable.reservationId, id))
    .returning();

  return updatedReservation;
};

export const deleteReservationService = async (id: string) => {
  await findReservationByIdService(id);

  const [deleteReservation] = await db
    .delete(reservationsTable)
    .where(eq(reservationsTable.reservationId, id))
    .returning();

  return deleteReservation;
};
