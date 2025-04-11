import fs from "fs";
import "dotenv/config";
import path from "path";
import cors from "cors";

import express from "express";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import { auth_router } from "./routes/auth/auth.routes.js";
import { lids_router } from "./routes/lids/lids.routes.js";
import { news_router } from "./routes/news/news.routes.js";
import { errorHandler } from "./middleware/error/errorHandler.js";
import { courses_router } from "./routes/courses/courses.routes.js";
import { questions_router } from "./routes/questions/questions.routes.js";

async function starter() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const app = express();
    const PORT = process.env.PORT;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(
      cors({
        origin: ["https://admin.isouzbekistan.uz", "https://www.isouzbekistan.uz"], // to'g'ri array
        credentials: true,
      })
    );

    app.use(cookieParser());
    app.use("/api/auth", auth_router);
    app.use("/api/news", news_router);
    app.use("/api/lids", lids_router);
    app.use("/api/courses", courses_router);
    app.use("/api/questions", questions_router);
    app.get("/api/:filename", (req, res) => {
      const { filename } = req.params;
      const filePath = path.join(__dirname, "../uploads", filename); // uploads papkasidagi fayl

      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).send("File not found");
      }
    });

    app.use(errorHandler);

    app.listen(PORT, console.log(`Server is running on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
}

starter();
