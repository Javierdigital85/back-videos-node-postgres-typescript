import express from "express";
import videosRouter from "./videos.route";
import userRouter from "./users.route";
const router = express.Router();

function routerConfig() {
  router.use("/videos", videosRouter);
  router.use("/users", userRouter);
  return router;
}
export default routerConfig;
