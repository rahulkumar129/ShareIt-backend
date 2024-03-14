import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const corsOptions = {
	origin: "*",
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Use Routes
import userRouter from "./routes/user.routes.js";
import uploadRouter from "./routes/upload.routes.js";

app.use("/auth", userRouter);
app.use("/api", uploadRouter);

export default app;
