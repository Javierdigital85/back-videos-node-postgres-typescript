import express, { Express } from "express";
import routerConfig from "./routes/index";
import morgan from "morgan";
import cors from "cors";
import globalConstants from "./conts/globalContants";

const allowedOrigins = ["http://localhost:5173", globalConstants.FRONTEND_URL];
const apiConfiguration = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: allowedOrigins }));
  app.use(morgan("tiny"));
};
const routerConfiguration = (app: Express) => {
  app.use("/api", routerConfig());
};

const app: Express = express();
apiConfiguration(app);
routerConfiguration(app);

export default app;
