"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comic.belongsToMany(models.Category, {
        through: models.Comic_Categories,
        foreignKey: "comicId",
        as: "categories",
      });
      Comic.hasMany(models.Comment, { foreignKey: "comicId", as: "comments" });
      Comic.hasMany(models.Image, { foreignKey: "comicId", as: "images" });
      Comic.hasMany(models.Chapter, { foreignKey: "comicId", as: "chapters" });
    }
  }
  Comic.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      nickName: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      postDateComic: DataTypes.DATE,
      image: DataTypes.TEXT,
      views: DataTypes.INTEGER,
      dayUpdated: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comic",
    }
  );
  return Comic;
};
