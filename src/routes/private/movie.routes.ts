import {
  handleCreateMovie,
  handleDeleteMovie,
  handleGetMovie,
  handleGetMovies,
  handleUpdateMovie,
} from "@/controllers/movie.controller";
import validateSchema from "@/middlewares/validate-schema.middleware";
import { getParamsId } from "@/schemas";
import { createMovieSchema, updateMovieSchema } from "@/schemas/movie.schema";
import { Router } from "express";

const movieRoutes = Router();

movieRoutes
  .route("/")
  .get(handleGetMovies)
  .post(validateSchema(createMovieSchema), handleCreateMovie);

movieRoutes
  .route("/:id")
  .get(validateSchema(getParamsId), handleGetMovie)
  .patch(validateSchema(updateMovieSchema), handleUpdateMovie)
  .delete(validateSchema(getParamsId), handleDeleteMovie);

export default movieRoutes;
