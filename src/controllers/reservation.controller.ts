import { GetId } from "@/schemas";
import {
  CreateReservation,
  UpdateReservation,
} from "@/schemas/reservation.schema";
import {
  createReservationService,
  deleteReservationService,
  findAllReservationsService,
  findReservationByIdService,
  updateReservationService,
} from "@/services/reservation.service";
import { Request, Response } from "express";

export const handleGetReservations = async (req: Request, res: Response) => {
  const reservations = await findAllReservationsService(req.userId);

  res.json(reservations);
};

export const handleGetReservation = async (
  req: Request<GetId["params"], unknown, unknown, unknown>,
  res: Response
) => {
  const reservation = await findReservationByIdService(req.params.id);

  res.json(reservation);
};

export const handleCreateReservation = async (
  req: Request<unknown, unknown, CreateReservation["body"], unknown>,
  res: Response
) => {
  await createReservationService({ ...req.body, userId: req.userId });

  res.status(201).json({ message: "Reservation created" });
};

export const handleUpdateReservation = async (
  req: Request<
    UpdateReservation["params"],
    unknown,
    UpdateReservation["body"],
    unknown
  >,
  res: Response
) => {
  await updateReservationService(req.params.id, {
    ...req.body,
    userId: req.userId,
  });

  res.json({ message: "Reservation updated" });
};

export const handleDeleteReservation = async (
  req: Request<GetId["params"], unknown, unknown, unknown>,
  res: Response
) => {
  await deleteReservationService(req.params.id);

  res.json({ message: "Reservation deleted" });
};
