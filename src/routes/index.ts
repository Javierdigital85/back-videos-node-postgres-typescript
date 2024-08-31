import express from "express";
import videosRouter from "./videos.route";
const router = express.Router();

function routerConfig() {
  router.use("/videos", videosRouter);
  return router;
}
export default routerConfig;
