import {
  handleCreateTheater,
  handleDeleteTheater,
  handleGetTheater,
  handleGetTheaters,
  handleUpdateTheater,
} from "@/controllers/theater.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { getParamsId } from "@/schemas";
import {
  createTheaterSchema,
  updateTheaterSchema,
} from "@/schemas/theater.schema";
import { Router } from "express";

const theaterRoutes = Router();

theaterRoutes
  .route("/")
  .get(handleGetTheaters)
  .post(validateSchema(createTheaterSchema), handleCreateTheater);

theaterRoutes
  .route("/:id")
  .get(validateSchema(getParamsId), handleGetTheater)
  .patch(validateSchema(updateTheaterSchema), handleUpdateTheater)
  .delete(validateSchema(getParamsId), handleDeleteTheater);

export default theaterRoutes;
