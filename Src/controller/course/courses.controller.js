import { Op, Sequelize } from "sequelize";
import { Courses } from "../../models/relations.js";
import { asyncWrapper } from "../../middleware/wrapper/asyncWrapper.js";

export class CourseController {
  static create = asyncWrapper(async (req, res) => {
    let {
      catalog,
      course_title_uz,
      course_title_ru,
      course_title_eng,
      benefits_uz,
      benefits_ru,
      benefits_eng,
      course_objective_uz,
      course_objective_ru,
      course_objective_eng,
      objective_title_uz,
      objective_title_ru,
      objective_title_eng,
      end_title_uz,
      end_title_ru,
      end_title_eng,
      end_info_uz,
      end_info_ru,
      end_info_eng,
      course_price,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Image not found. Bad request", status: 400 });
    }

    let createdData = await Courses.create({
      image: `/${req.file.filename}`,
      catalog,
      course_title_uz,
      course_title_ru,
      course_title_eng,
      benefits_uz,
      benefits_ru,
      benefits_eng,
      course_objective_uz,
      course_objective_ru,
      course_objective_eng,
      objective_title_uz,
      objective_title_ru,
      objective_title_eng,
      end_title_uz,
      end_title_ru,
      end_title_eng,
      end_info_uz,
      end_info_ru,
      end_info_eng,
      course_price: Number(course_price),
    });

    res.status(201).json({ data: createdData, status: 201 });
  });

  static getCategories = asyncWrapper(async (req, res) => {
    const catalogs = await Courses.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("catalog")), "catalog"],
      ],
      raw: true,
    });

    const uniqueCatalogs = catalogs.map((c) => c.catalog);

    return res.status(200).json({
      total: uniqueCatalogs.length,
      catalog: uniqueCatalogs,
    });
  });

  static getAll = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default: 1-sahifa, 10 ta kurs
    const offset = (page - 1) * limit;

    const { count, rows } = await Courses.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]], // Yangi kurslar birinchi bo‘lib chiqadi
    });

    res.json({
      totalCourses: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      courses: rows,
    });
  });

  static getById = asyncWrapper(async (req, res) => {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Bad request", status: 400 });
    }

    let result = await Courses.findOne({ where: { id: id } });

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

    const result = await Courses.findOne({ where: { id: id } });

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

    const course = await Courses.findByPk(id);

    if (!course) {
      return res.status(404).json({ message: "Data not found", status: 404 });
    }

    if (updateData.id) {
      updateData.id = course.id;
    }

    // Agar rasm yuborilgan bo'lsa
    if (req.file) {
      updateData.image = `/${req.file.filename}`; // Rasmni yangilash
    }

    await course.update(updateData);

    res
      .status(200)
      .json({ message: "Course successfully updated", course, status: 200 });
  });

  static getByCatalog = asyncWrapper(async (req, res) => {
    const { catalog, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = catalog
      ? { catalog: { [Op.iLike]: `%${catalog}%` } }
      : {};

    const { count, rows } = await Courses.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      totalCourses: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      courses: rows,
    });
  });
}
