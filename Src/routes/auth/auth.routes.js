import { Router } from "express";
import { checkAdminToken } from "../../token/check.token.js";
import { AuthController } from "../../controller/auth/auth.controller.js";
import { AuthMiddleware } from "../../middleware/auth/auth.middleware.js";

export const auth_router = Router();

auth_router
  .post("/login", AuthMiddleware, AuthController.login)
  .post("/refresh/token", AuthController.refreshToken)
  .post("/token/exists", checkAdminToken, AuthController.checkTokenExists);
