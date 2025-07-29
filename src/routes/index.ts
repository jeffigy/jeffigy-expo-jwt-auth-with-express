import { Router } from "express";
import publicRoutes from "./public";
import privateRoutes from "./private";
import { validateToken } from "@/middlewares/validate-token.middleware";

const apiRoutes = Router();

apiRoutes.use("/pub", publicRoutes);
apiRoutes.use(
  "/pvt",
  //  validateToken,
  privateRoutes
);

export default apiRoutes;
