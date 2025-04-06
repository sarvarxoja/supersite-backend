import { DataTypes, Model } from "sequelize";
import newSequlize from "../../config/index.js";

export class Questions extends Model {}

Questions.init(
  {
    question: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    answer: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  },
  {
    sequelize: newSequlize,
    tableName: "Questions",
  }
);