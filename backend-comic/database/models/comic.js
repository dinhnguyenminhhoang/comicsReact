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
      //
    }
  }
  Comic.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.STRING,
      postDateComic: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comic",
    }
  );
  return Comic;
};
