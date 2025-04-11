import { Router } from "express";
import { upload } from "../../utils/multer/multer.js";
import { checkAdminToken } from "../../token/check.token.js";
import newsMiddleware from "../../middleware/news/news.middleware.js";
import { NewsController } from "../../controller/news/news.controller.js";

export const news_router = Router();

news_router
  .post(
    "/create",
    checkAdminToken,
    upload.single("image"),
    newsMiddleware.CreateMiddleware,
    NewsController.create
  )
  .get("/all", NewsController.getAll)
  .get("/by/:id", NewsController.getById)
  .patch(
    "/:id",
    checkAdminToken,
    upload.single("image"),
    newsMiddleware.UpdateMiddleware,
    NewsController.updateById
  )
  .delete("/:id", checkAdminToken, NewsController.deleteById);
