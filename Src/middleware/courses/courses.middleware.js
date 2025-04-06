export default {
  CreateMiddleware(req, res, next) {
    try {
      let {
        catalog,
        course_title_uz,
        course_title_ru,
        course_title_eng,
        benefits_uz,
        benefits_ru,
        benefits_eng,
        course_objective_uz,
        course_objective_ru,
        course_objective_eng,
        course_price,
      } = req.body;

      if (
        !catalog ||
        !course_title_uz ||
        !course_title_ru ||
        !course_title_eng ||
        !benefits_uz ||
        !benefits_ru ||
        !benefits_eng ||
        !course_objective_uz ||
        !course_objective_ru ||
        !course_objective_eng ||
        !course_price
      ) {
        return res
          .status(400)
          .json({ message: "Data is not fully. Bad request", status: 400 });
      }

      return next();
    } catch (error) {
      console.log(error);
    }
  },

  UpdateMiddleware(req, res, next) {
    try {
      let {
        catalog,
        course_title_uz,
        course_title_ru,
        course_title_eng,
        benefits_uz,
        benefits_ru,
        benefits_eng,
        course_objective_uz,
        course_objective_ru,
        course_objective_eng,
        course_price,
      } = req.body;

      if (
        !catalog &&
        !course_title_uz &&
        !course_title_ru &&
        !course_title_eng &&
        !benefits_uz &&
        !benefits_ru &&
        !benefits_eng &&
        !course_objective_uz &&
        !course_objective_ru &&
        !course_objective_eng &&
        !course_price
      ) {
        return res
          .status(400)
          .json({ message: "Data is not fully. Bad request", status: 400 });
      }

      return next();
    } catch (error) {
      console.log(error);
    }
  },
};
