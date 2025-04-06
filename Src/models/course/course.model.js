import { DataTypes, Model } from "sequelize";
import newSequlize from "../../config/index.js";

export class Courses extends Model {}

Courses.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    catalog: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    course_title_uz: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    course_title_ru: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    course_title_eng: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    benefits_uz: {
      type: DataTypes.STRING,
      defaultValue: null,
    },

    benefits_ru: {
      type: DataTypes.STRING,
      defaultValue: null,
    },

    benefits_eng: {
      type: DataTypes.STRING,
      defaultValue: null,
    },

    course_objective_uz: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    course_objective_ru: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    course_objective_eng: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    course_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: newSequlize,
    tableName: "Courses",
  }
);
