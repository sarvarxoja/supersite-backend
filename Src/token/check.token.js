import jwt from "jsonwebtoken";
import { Admin } from "../models/relations.js";

export async function checkAdminToken(req, res, next) {
  try {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Access token not found", status: 401 });
    }

    const accessToken = authHeader.split(" ")[1];
    let payload = jwt.verify(accessToken, process.env.SECRET_KEY);

    let data = await Admin.findOne({
      where: { id: payload.id },
    });

    if (!data) {
      return res.status(401).json({ message: "Unauthorized", status: 401 });
    }

    if (data.tokenVersion !== payload.version) {
      return res.status(401).json({ message: "Unauthorized", status: 401 });
    }

    req.admin = data;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // console.log(error);
      return res.status(401).json({ message: "Unauthorized", status: 401 });
    }

    console.error("Token tekshiruvida xatolik:", error);
    return res.status(500).json({ message: "Server error", status: 500 });
  }
}
