"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Comment, { foreignKey: "userId", as: "comments" });
      User.hasMany(models.Collection, {
        foreignKey: "userId",
        as: "collections",
      });
      User.hasMany(models.Follow, { foreignKey: "userId", as: "follows" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      image: DataTypes.TEXT("long"),
      roleId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
