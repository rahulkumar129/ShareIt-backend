import { Router } from "express";
import uploadPost from "../controllers/post.controller.js";
import updateLike from "../controllers/update.controller.js";
const uploadRouter = Router();

uploadRouter.route("/upload").post(uploadPost);
uploadRouter.route("/update").post(updateLike);

export default uploadRouter;
