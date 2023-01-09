import express, { Router } from "express";
export const router: Router = express.Router();

const userRouter = require("./userRouter");

router.use("/users", userRouter);
