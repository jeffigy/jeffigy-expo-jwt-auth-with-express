import {
  findAllShowtimesService,
  findShowtimeByIdService,
  createShowtimeService,
  updateShowtimeService,
  deleteShowtimeService,
} from "@/services/showtime.service";
import { Request, Response } from "express";
import { CreateShowtime, UpdateShowtime } from "@/schemas/showtime.schema";
import { GetId } from "@/schemas";

export const handleGetShowtimes = async (req: Request, res: Response) => {
  const showtimes = await findAllShowtimesService();
  res.json(showtimes);
};

export const handleGetShowtime = async (
  req: Request<GetId["params"]>,
  res: Response
) => {
  const showtime = await findShowtimeByIdService(req.params.id);

  res.json(showtime);
};

export const handleCreateShowtime = async (
  req: Request<unknown, unknown, CreateShowtime["body"]>,
  res: Response
) => {
  await createShowtimeService(req.body);

  res.status(201).json({ message: "Showtime added" });
};

export const handleUpdateShowtime = async (
  req: Request<UpdateShowtime["params"], unknown, UpdateShowtime["body"]>,
  res: Response
) => {
  await updateShowtimeService(req.params.id, req.body);

  res.json({ message: "Showtime updated" });
};

export const handleDeleteShowtime = async (
  req: Request<GetId["params"], unknown, unknown>,
  res: Response
) => {
  await deleteShowtimeService(req.params.id);

  res.json({ message: "Showtime deleted" });
};
