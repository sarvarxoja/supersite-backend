import "dotenv/config";
import path from "path";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import { auth_router } from "./routes/auth/auth.routes.js";
import { lids_router } from "./routes/lids/lids.routes.js";
import { news_router } from "./routes/news/news.routes.js";
import { errorHandler } from "./middleware/error/errorHandler.js";
import { courses_router } from "./routes/courses/courses.routes.js";
import { questions_router } from "./routes/questions/questions.routes.js";

const app = express();

async function starter() {
  try {
    const PORT = process.env.PORT;

    app.use(express.json());

    app.use(
      cors({
        origin: ["http://localhost:5173", "http://localhost:5174"], // to'g'ri array
        credentials: true,
      })
    );

    app.use(cookieParser());
    app.use("/auth", auth_router);
    app.use("/news", news_router);
    app.use("/lids", lids_router);
    app.use("/courses", courses_router);
    app.use("/questions", questions_router);
    app.use(express.static(path.join(path.resolve(), "uploads")));

    app.use(errorHandler);

    app.listen(PORT, console.log(`Server is running on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
}

starter();

export default app;
