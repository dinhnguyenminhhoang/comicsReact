"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection_Comics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Collection_Comics.belongsTo(models.Collection, {
        foreignKey: "collectionId",
      });
      Collection_Comics.belongsTo(models.Comic, {
        foreignKey: "comicId",
      });
    }
  }
  Collection_Comics.init(
    {
      collectionId: DataTypes.INTEGER,
      comicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Collection_Comics",
    }
  );
  return Collection_Comics;
};
