export default {
  CreateMiddleware(req, res, next) {
    try {
      let {
        question_uz,
        question_ru,
        question_eng,
        answer_uz,
        answer_ru,
        answer_eng,
      } = req.body;

      if (
        !question_uz ||
        !question_ru ||
        !question_eng ||
        !answer_uz ||
        !answer_ru ||
        !answer_eng
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
      let { question, answer } = req.body;

      if (!question && !answer) {
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
