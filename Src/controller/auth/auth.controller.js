import jwt from "jsonwebtoken";

import { Admin } from "../../models/admin/admin.model.js";
import { comparePassword } from "../../utils/bcrypt/bcrypt.js";
import { jwtRefreshSign, jwtSign } from "../../utils/jwt/jwt.js";
import { asyncWrapper } from "../../middleware/wrapper/asyncWrapper.js";

export class AuthController {
  static login = asyncWrapper(async (req, res) => {
    let { login, password } = req.body;

    let data = await Admin.findOne({
      where: { login: login },
    });

    if (data) {
      let check_password = await comparePassword(password, data.password);
      if (check_password) {
        const refreshToken = await jwtRefreshSign(data.id, data.tokenVersion);
        const accessToken = await jwtSign(data.id, data.tokenVersion);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });

        return res.status(200).json({
          accessToken: accessToken,
          login: data.login,
          success: true,
          status: 200,
        });
      } else {
        return res.status(401).json({
          msg: "wrong username or password",
          status: 401,
        });
      }
    } else {
      return res.status(401).json({
        msg: "No such user exists",
        status: 401,
      });
    }
  });

  static refreshToken = asyncWrapper(async (req, res) => {
    let { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized",
        status: 401,
      });
    }

    let payload = jwt.verify(refreshToken, process.env.VERIFY_KEY);

    let data = await Admin.findOne({
      where: { id: payload.id },
    });

    if (!data) {
      return res.status(401).json({
        message: "Unauthorized",
        status: 401,
      });
    }

    if (data.tokenVersion !== payload.version) {
      return res.status(401).json({
        message: "Unauthorized",
        status: 401,
      });
    }

    const token = await jwtSign(data.id, data.tokenVersion);
    res.json({ accessToken: token, message: "Token refreshed", status: 200 });
  });

  static checkTokenExists = asyncWrapper(async (req, res) => {
    res.status(200).json({ message: "success", status: 200 });
  });
}
