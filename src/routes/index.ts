import express from "express";
import videosRouter from "./videos.route";
import userRouter from "./users.route";
import favRouter from "./fav.route";

const router = express.Router();

function routerConfig() {
  router.use("/videos", videosRouter);
  router.use("/users", userRouter);
  router.use("/fav", favRouter);

  return router;
}
export default routerConfig;
