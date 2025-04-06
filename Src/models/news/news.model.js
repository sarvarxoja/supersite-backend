import { DataTypes, Model } from "sequelize";
import newSequlize from "../../config/index.js";

export class News extends Model {}

News.init(
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

    news_title_uz: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    news_title_ru: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    news_title_eng: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    news_about_uz: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    news_about_ru: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    news_about_eng: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    sequelize: newSequlize,
    tableName: "News",
  }
);
