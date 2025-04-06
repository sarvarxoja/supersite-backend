export function AuthMiddleware(req, res, next) {
  try {
    let { login, password } = req.body;

    if (!login || !password) {
      return res
        .status(400)
        .json({ message: "Data is not fully. Bad request", status: 400 });
    }

    return next();
  } catch (error) {
    console.log(error);
  }
}
