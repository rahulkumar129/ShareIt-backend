import { Router } from "express";
import {
	registerUser,
	loginUser,
	isLogged,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

// userRouter.route("/login").post(loginUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/signup").post(registerUser);
userRouter.route("/islogged").get(verifyJWT, isLogged);

export default userRouter;
