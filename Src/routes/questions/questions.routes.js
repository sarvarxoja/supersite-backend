import { Router } from "express";

import { checkAdminToken } from "../../token/check.token.js";
import { QuestionsController } from "../../controller/questions/questions.controller.js";
import questionsMiddleware from "../../middleware/questions/questions.middleware.js";

export const questions_router = Router();

questions_router
  .post(
    "/create",
    checkAdminToken,
    questionsMiddleware.CreateMiddleware,
    QuestionsController.create
  )
  .get("/all", QuestionsController.getAll)
  .get("/by/:id", QuestionsController.getById)
  .patch(
    "/:id",
    checkAdminToken,
    questionsMiddleware.UpdateMiddleware,
    QuestionsController.updateById
  )
  .delete("/:id", checkAdminToken, QuestionsController.deleteById);
