import app from "./app";
import { PORT } from "@/config/env.config";
import { connectDb } from "./db";

void (async () => {
  await connectDb();
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`App is running @ port ${PORT}`);
  });
})();
