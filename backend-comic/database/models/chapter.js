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
      //
    }
  }
  Chapter.init(
    {
      title: DataTypes.STRING,
      comicId: DataTypes.INTEGER,
      content: DataTypes.TEXT("long"),
      postDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};
