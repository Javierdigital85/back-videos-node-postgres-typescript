import express, { Express } from "express";
import routerConfig from "./routes/index";
import morgan from "morgan";
import cors from "cors";
import globalConstants from "./conts/globalContants";

const apiConfiguration = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: globalConstants.FRONTEND_URL || "http://localhost:5173",
    })
  );
  app.use(morgan("tiny"));
};
const routerConfiguration = (app: Express) => {
  app.use("/api", routerConfig());
};

const app: Express = express();
apiConfiguration(app);
routerConfiguration(app);

export default app;
