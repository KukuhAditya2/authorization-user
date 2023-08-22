import router from "../routes/publict-router.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import userRouter from "../routes/user-router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

export const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(router);
app.use(userRouter);

app.use(errorMiddleware);
