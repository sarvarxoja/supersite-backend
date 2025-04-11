import { Router } from "express";
import { upload } from "../../utils/multer/multer.js";
import { checkAdminToken } from "../../token/check.token.js";
import { CourseController } from "../../controller/course/courses.controller.js";
import coursesMiddleware from "../../middleware/courses/courses.middleware.js";

export const courses_router = Router();

courses_router
  .post(
    "/create",
    checkAdminToken,
    upload.single("image"),
    coursesMiddleware.CreateMiddleware,
    CourseController.create
  )
  .get("/get/catalog", CourseController.getCategories)
  .get("/all", CourseController.getAll)
  .get("/by/:id", CourseController.getById)
  .get("/get/by/catalog", CourseController.getByCatalog)
  .patch(
    "/:id",
    checkAdminToken,
    upload.single("image"),
    coursesMiddleware.UpdateMiddleware,
    CourseController.updateById
  )
  .delete("/:id", checkAdminToken, CourseController.deleteById);
