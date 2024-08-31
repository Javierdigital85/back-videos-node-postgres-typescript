import express from "express";
import * as videoController from "../controller/videos.controller";
const router = express.Router();

router.get("/videos", videoController.getVideos);
router.get("/video/:id", videoController.getAVideo);
router.post("/video", videoController.createVideo);
router.delete("/video/:id", videoController.deleteVideo);
router.put("/video/:id", videoController.updateVideo);

export default router;
