import express, { query } from "express";
import { getUsers, postUser } from "../controllers/userFunctions.js";
import protectRoute from "../controllers/ProtectHelper.js";
const userRouter = express.Router();

userRouter.route("/").get(protectRoute, getUsers).post(protectRoute, postUser);

export default userRouter;
