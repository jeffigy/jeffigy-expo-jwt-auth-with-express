import {
  handleCreateShowtime,
  handleDeleteShowtime,
  handleGetShowtime,
  handleGetShowtimes,
  handleUpdateShowtime,
} from "@/controllers/showtime.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { getParamsId } from "@/schemas";
import {
  createShowtimeSchema,
  updateShowtimeSchema,
} from "@/schemas/showtime.schema";
import { Router } from "express";

const showtimeRoutes = Router();

showtimeRoutes
  .route("/")
  .get(handleGetShowtimes)
  .post(validateSchema(createShowtimeSchema), handleCreateShowtime);
showtimeRoutes
  .route("/:id")
  .get(validateSchema(getParamsId), handleGetShowtime)
  .patch(validateSchema(updateShowtimeSchema), handleUpdateShowtime)
  .delete(validateSchema(getParamsId), handleDeleteShowtime);

export default showtimeRoutes;
