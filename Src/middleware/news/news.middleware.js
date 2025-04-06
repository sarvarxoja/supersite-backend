export default {
  CreateMiddleware(req, res, next) {
    try {
      let {
        news_title_uz,
        news_title_ru,
        news_title_eng,
        news_about_uz,
        news_about_ru,
        news_about_eng,
      } = req.body;

      console.log(req.body)

      if (
        !news_title_uz ||
        !news_title_ru ||
        !news_title_eng ||
        !news_about_uz ||
        !news_about_ru ||
        !news_about_eng
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
        news_title_uz,
        news_title_ru,
        news_title_eng,
        news_about_uz,
        news_about_ru,
        news_about_eng,
      } = req.body;

      if (
        !news_title_uz &&
        !news_title_ru &&
        !news_title_eng &&
        !news_about_uz &&
        !news_about_ru &&
        !news_about_eng
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
