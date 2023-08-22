import express from "express";
import {
  register,
  login,
  Token,
  logout
} from "../controllers/user-controllers.js";

const router = express.Router();

router.post("/users/register", register);
router.post("/users/login", login);
router.get("/token", Token);
router.delete("/users/logout", logout);

export default router;
