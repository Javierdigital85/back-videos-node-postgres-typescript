import express, { Application } from "express";
import routerConfig from "./routes/index";
import morgan from "morgan";
import cors from "cors";
import globalConstants from "./conts/globalContants";
import cookieParser from "cookie-parser";

const allowedOrigins = ["http://localhost:5173", globalConstants.FRONTEND_URL];
const apiConfiguration = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(morgan("tiny"));
  app.use(cookieParser());
};
const routerConfiguration = (app: Application) => {
  app.use("/api", routerConfig());
};

const app: Application = express();
apiConfiguration(app);
routerConfiguration(app);

export default app;
