import { GetId } from "@/schemas";
import { CreateMovie, UpdateMovie } from "@/schemas/movie.schema";
import {
  createMovieService,
  deleteMovieService,
  findAllMoviesService,
  findMovieByIdService,
  updateMovieService,
} from "@/services/movie.service";
import { Request, Response } from "express";

export const handleGetMovies = async (req: Request, res: Response) => {
  const movies = await findAllMoviesService();

  res.json(movies);
};

export const handleGetMovie = async (
  req: Request<GetId["params"], unknown, unknown>,
  res: Response
) => {
  const movie = await findMovieByIdService(req.params.id);

  res.json(movie);
};

export const handleCreateMovie = async (
  req: Request<unknown, unknown, CreateMovie["body"]>,
  res: Response
) => {
  await createMovieService(req.body);

  res.status(201).json({ message: "Movie added" });
};

export const handleUpdateMovie = async (
  req: Request<UpdateMovie["params"], unknown, UpdateMovie["body"]>,
  res: Response
) => {
  await updateMovieService(req.params.id, req.body);

  res.json({ message: "Movie updated" });
};

export const handleDeleteMovie = async (
  req: Request<GetId["params"], unknown, unknown>,
  res: Response
) => {
  await deleteMovieService(req.params.id);

  res.json({ message: "Movie deleted" });
};
