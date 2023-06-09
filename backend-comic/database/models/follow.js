"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Follow.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Follow.belongsTo(models.Comic, { foreignKey: "comicId", as: "comic" });
    }
  }
  Follow.init(
    {
      userId: DataTypes.INTEGER,
      comicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Follow",
    }
  );
  return Follow;
};
