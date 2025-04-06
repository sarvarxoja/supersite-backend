import { Router } from "express";
import { checkAdminToken } from "../../token/check.token.js";
import { LidsController } from "../../controller/lids/lids.controller.js";
import lidsMiddleware from "../../middleware/lids/lids.middleware.js";

export const lids_router = Router();

lids_router
  .post("/create", lidsMiddleware.CreateMiddleware, LidsController.create)
  .get("/by/:id", checkAdminToken, LidsController.getById)
  .patch(
    "/:id",
    checkAdminToken,
    lidsMiddleware.UpdateMiddleware,
    LidsController.updateById
  )
  .delete("/:id", checkAdminToken, LidsController.deleteById)
  .get("/time", checkAdminToken, LidsController.getLidsByDate);
