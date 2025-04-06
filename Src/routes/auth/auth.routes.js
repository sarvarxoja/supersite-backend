import { Router } from "express";
import { AuthController } from "../../controller/auth/auth.controller.js";
import { AuthMiddleware } from "../../middleware/auth/auth.middleware.js";

export const auth_router = Router();

auth_router
  .post("/login", AuthMiddleware, AuthController.login)
  .post("/refresh/token", AuthController.refreshToken);
