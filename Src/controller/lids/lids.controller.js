import { Op } from "sequelize";
import { Lids } from "../../models/relations.js";
import { asyncWrapper } from "../../middleware/wrapper/asyncWrapper.js";

function getDateRange(type) {
  const now = new Date();
  let startDate;

  switch (type) {
    case "today":
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case "week":
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday as first day
      startDate = new Date(now.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    default:
      return null;
  }

  return {
    [Op.gte]: startDate,
  };
}

export class LidsController {
  static create = asyncWrapper(async (req, res) => {
    let { full_name, phone_number, course_name, comment, from_time, to_time } = req.body;

    let createdData = await Lids.create({
      full_name,
      phone_number,
      course_name,
      comment,
      from_time,
      to_time,
    });

    res.status(201).json({ data: createdData, status: 201 });
  });

  static getById = asyncWrapper(async (req, res) => {
    let { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Bad request", status: 400 });
    }

    let result = await Lids.findOne({ where: { id: id } });

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

    const result = await Lids.findOne({ where: { id: id } });

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

    const course = await Lids.findByPk(id);

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

  static getLidsByDate = asyncWrapper(async (req, res) => {
    const { page = 1, limit = 10, filter = "all" } = req.query;

    const offset = (page - 1) * limit;

    const where = {};

    if (filter !== "all") {
      where.createdAt = getDateRange(filter);
    }

    const { count, rows } = await Lids.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  });
}
