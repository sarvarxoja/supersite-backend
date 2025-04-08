import { Questions } from "../../models/relations.js";
import { asyncWrapper } from "../../middleware/wrapper/asyncWrapper.js";

export class QuestionsController {
  static create = asyncWrapper(async (req, res) => {
    let {
      question_uz,
      question_ru,
      question_eng,
      answer_uz,
      answer_ru,
      answer_eng,
    } = req.body;

    let createdData = await Questions.create({
      question_uz,
      question_ru,
      question_eng,
      answer_uz,
      answer_ru,
      answer_eng,
    });

    res.status(201).json({ data: createdData, status: 201 });
  });

  static getAll = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default: 1-sahifa, 10 ta kurs
    const offset = (page - 1) * limit;

    const { count, rows } = await Questions.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Yangi kurslar birinchi bo‘lib chiqadi
    });

    res.json({
      totalQuestions: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      questions: rows,
    });
  });

  static getById = asyncWrapper(async (req, res) => {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Bad request", status: 400 });
    }

    let result = await Questions.findOne({ where: { id: id } });

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

    const result = await Questions.findOne({ where: { id: id } });

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

    const course = await Questions.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: "Data not found", status: 404 });
    }

    if (updateData.id) {
      updateData.id = course.id;
    }

    await course.update(updateData);

    res
      .status(200)
      .json({ message: "Course successfully updated", course, status: 200 });
  });
}
