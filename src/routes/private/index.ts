import { Router } from "express";
import movieRoutes from "./movie.routes";
import theaterRoutes from "./theater.routes";
import showtimeRoutes from "./showtime.routes";
import reservationRoutes from "./reservation.routes";

const privateRoutes = Router();

privateRoutes.use("/movies", movieRoutes);
privateRoutes.use("/theaters", theaterRoutes);
privateRoutes.use("/showtimes", showtimeRoutes);
privateRoutes.use("/reservations", reservationRoutes);

export default privateRoutes;
