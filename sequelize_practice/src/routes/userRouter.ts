import express, { Router } from "express";
import * as userController from "../controllers/userController";

const router: Router = express.Router();

router.post("/signup", userController.signUp);
router.post("/signIn", userController.singIn);

module.exports = router;
