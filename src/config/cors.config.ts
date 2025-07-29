import { CorsOptions } from "cors";
import { CORS_WHITELIST } from "./env.config";

const corsOption: CorsOptions = {
  origin(origin, callback) {
    if (
      origin === undefined ||
      CORS_WHITELIST.indexOf(origin) !== -1 ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOption;
