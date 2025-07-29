import { GetId } from "@/schemas";
import { CreateTheater, UpdateTheater } from "@/schemas/theater.schema";
import {
  createTheaterService,
  deleteTheaterService,
  findAllTheatersService,
  findTheaterByIdService,
  updateTheaterService,
} from "@/services/theater.service";
import { Request, Response } from "express";

export const handleGetTheaters = async (req: Request, res: Response) => {
  const theaters = await findAllTheatersService();

  res.json(theaters);
};

export const handleGetTheater = async (
  req: Request<GetId["params"], unknown, unknown>,
  res: Response
) => {
  const theater = await findTheaterByIdService(req.params.id);

  res.json(theater);
};

export const handleCreateTheater = async (
  req: Request<unknown, unknown, CreateTheater["body"]>,
  res: Response
) => {
  await createTheaterService(req.body);

  res.status(201).json({ message: "Theater added" });
};

export const handleUpdateTheater = async (
  req: Request<UpdateTheater["params"], unknown, UpdateTheater["body"]>,
  res: Response
) => {
  await updateTheaterService(req.params.id, req.body);

  res.json({ message: "Theater updated" });
};

export const handleDeleteTheater = async (
  req: Request<GetId["params"], unknown, unknown>,
  res: Response
) => {
  await deleteTheaterService(req.params.id);

  res.json({ message: "Theater deleted" });
};
