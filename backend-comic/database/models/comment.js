"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Comic, { foreignKey: "comicId", as: "comics" });
      Comment.belongsTo(models.Chapter, {
        foreignKey: "chapterId",
        as: "chapters",
      });
      Comment.belongsTo(models.User, { foreignKey: "userId", as: "users" });
    }
  }
  Comment.init(
    {
      comicId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      chapterId: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      postDateComment: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
