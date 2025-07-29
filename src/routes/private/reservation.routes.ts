import {
  handleCreateReservation,
  handleDeleteReservation,
  handleGetReservation,
  handleGetReservations,
  handleUpdateReservation,
} from "@/controllers/reservation.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { getParamsId } from "@/schemas";
import {
  createReservationSchema,
  updateReservationSchema,
} from "@/schemas/reservation.schema";
import { Router } from "express";

const reservationRoutes = Router();

reservationRoutes
  .route("/")
  .get(handleGetReservations)
  .post(validateSchema(createReservationSchema), handleCreateReservation);
reservationRoutes
  .route("/:id")
  .get(validateSchema(getParamsId), handleGetReservation)
  .patch(validateSchema(updateReservationSchema), handleUpdateReservation)
  .delete(validateSchema(getParamsId), handleDeleteReservation);

export default reservationRoutes;
