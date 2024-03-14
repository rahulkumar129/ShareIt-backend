import { Router } from "express";
import uploadPost from "../controllers/post.controller.js";

const uploadRouter = Router();

uploadRouter.route("/upload").post(uploadPost);

export default uploadRouter;
