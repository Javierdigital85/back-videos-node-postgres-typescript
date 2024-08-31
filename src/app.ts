import express, { Express } from "express";
import routerConfig from "./routes/index";
import morgan from "morgan";
import cors from "cors";

const apiConfiguration = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(morgan("tiny"));
};
const routerConfiguration = (app: Express) => {
  app.use("/api", routerConfig());
};

const app: Express = express();
apiConfiguration(app);
routerConfiguration(app);

export default app;
