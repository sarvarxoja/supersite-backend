import { DataTypes, Model } from "sequelize";
import newSequlize from "../../config/index.js";

export class Questions extends Model {}

Questions.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    question_ru: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    question_uz: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    question_eng: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    answer_uz: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    answer_ru: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    answer_eng: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  },
  {
    sequelize: newSequlize,
    tableName: "Questions",
  }
);
