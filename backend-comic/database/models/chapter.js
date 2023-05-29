"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chapter.belongsTo(models.Comic, { foreignKey: "comicId", as: "comics" });
      Chapter.hasMany(models.Comment, {
        foreignKey: "chapterId",
        as: "comments",
      });
    }
  }
  Chapter.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT("long"),
      numericalOrder: DataTypes.INTEGER,
      dayUpdated: DataTypes.DATE,
      views: DataTypes.INTEGER,
      comicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};
