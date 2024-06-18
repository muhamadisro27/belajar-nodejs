import express from "express";
import { register, login } from "../handler/user-controller.js";

const publicRouter = express.Router();

publicRouter.post("/api/users", register);
publicRouter.post("/api/users/login", login);

export { publicRouter };
