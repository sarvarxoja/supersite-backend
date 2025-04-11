import { News } from "../../models/relations.js";
import { asyncWrapper } from "../../middleware/wrapper/asyncWrapper.js";

export class NewsController {
  static create = asyncWrapper(async (req, res) => {
    let {
      news_title_uz,
      news_title_ru,
      news_title_eng,
      news_about_uz,
      news_about_ru,
      news_about_eng,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Image not found. Bad request", status: 400 });
    }

    let createdData = await News.create({
      image: `/${req.file.filename}`,
      news_title_uz,
      news_title_ru,
      news_title_eng,
      news_about_uz,
      news_about_ru,
      news_about_eng,
    });

    res.status(201).json({ data: createdData, status: 201 });
  });

  static getAll = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows } = await News.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      totalNews: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      news: rows,
    });
  });

  static getById = asyncWrapper(async (req, res) => {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Bad request", status: 400 });
    }

    let result = await News.findOne({ where: { id: id } });

    if (!result) {
      return res.status(404).json({ message: "Data not found", status: 404 });
    }

    res.status(200).json({ data: result, status: 200 });
  });

  static deleteById = asyncWrapper(async (req, res) => {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Bad request", status: 400 });
    }

    const result = await News.findOne({ where: { id: id } });

    if (!result) {
      return res.status(404).json({ message: "Data not found", status: 404 });
    }

    await result.destroy();

    res.status(200).json({
      message: "Data successfully deleted",
      data: result,
      status: 200,
    });
  });

  static updateById = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({ message: "Bad request", status: 400 });
    }

    const course = await News.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: "Data not found", status: 404 });
    }

    if (updateData.id) {
      updateData.id = course.id;
    }

    if (req.file) {
      updateData.image = `/${req.file.filename}`; // Rasmni yangilash
    }

    await course.update(updateData);

    res
      .status(200)
      .json({ message: "Course successfully updated", course, status: 200 });
  });
}
