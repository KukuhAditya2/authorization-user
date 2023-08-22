import express from "express";
import { getUsers, update } from "../controllers/user-controllers.js";
import { authTokenUser } from "../middleware/autMiddleware.js";
const userRouter = express.Router();

userRouter.use(authTokenUser);
userRouter.get("/users", getUsers);
userRouter.patch("/users", update);

export default userRouter;
