import { DataTypes, Model } from "sequelize";
import newSequlize from "../../config/index.js";

export class Lids extends Model {}

Lids.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    full_name: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },

    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    course_name: {
      type: DataTypes.STRING(),
    },

    comment: {
      type: DataTypes.STRING(400),
      defaultValue: null,
    },

    from_time: {
      type: DataTypes.STRING,
      defaultValue: null,
    },

    to_time: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize: newSequlize,
    tableName: "Lids",
  }
);
