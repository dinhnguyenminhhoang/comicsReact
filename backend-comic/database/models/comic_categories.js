"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comic_Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comic_Categories.belongsTo(models.Comic, {
        foreignKey: "comicId",
        as: "comic",
      });

      Comic_Categories.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "categories",
      });
    }
  }
  Comic_Categories.init(
    {
      comicId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comic_Categories",
    }
  );
  return Comic_Categories;
};
