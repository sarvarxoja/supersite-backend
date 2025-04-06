export default {
  CreateMiddleware(req, res, next) {
    try {
      let {
        full_name,
        phone_number,
        course_name,
        from_time,
        to_time,
      } = req.body;

      if (
        !full_name ||
        !phone_number ||
        !course_name ||
        !from_time ||
        !to_time
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
        full_name,
        phone_number,
        course_name,
        comment,
        from_time,
        to_time,
      } = req.body;

      if (
        !full_name&&
        !phone_number &&
        !course_name &&
        !comment &&
        !from_time &&
        !to_time
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
