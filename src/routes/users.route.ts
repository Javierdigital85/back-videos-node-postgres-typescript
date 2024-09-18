import express from "express";
import * as userController from "../controller/users.controller";
import { validateUser } from "../middleware/auth";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/users", userController.getAllusers);
router.get("/user/:id", userController.getUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.get("/me", validateUser, userController.me);
router.post("/logout", userController.logout);
router.put("/forgotpassword", userController.forgotPassword);
router.get("/validate-token/:token",userController.validateTokenRestorePassword)
router.post("/overwrite-password/:token",userController.overWritePassword)

export default router;
