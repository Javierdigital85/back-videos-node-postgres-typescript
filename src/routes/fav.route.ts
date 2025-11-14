import express from "express";
import * as favController from "../controller/favs.controller";
const router = express.Router();

router.post("/register", favController.createFav);
router.get("/favs", favController.getFavs);
router.delete("/delete/:id", favController.deleteFavs)

export default router;
