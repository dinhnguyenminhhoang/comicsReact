"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Collection.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Collection.belongsToMany(models.Comic, {
        through: "Collection_Comics",
        foreignKey: "collectionId",
        as: "comics",
      });
    }
  }
  Collection.init(
    {
      collectionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      name: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Collection",
    }
  );
  return Collection;
};
