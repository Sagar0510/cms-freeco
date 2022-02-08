import express from "express";
import { getSignInPage, signInUser } from "../controllers/signinFunctions.js";
const authRouter = express.Router();

authRouter.route("/signin").get(getSignInPage).post(signInUser);

export default authRouter;
