const express = require("express");
const router = express.Router();
const db = require("../../../database/models/index");
const createComicMiddleware = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const comicId = req.body.comicId;
    if (userId && comicId) {
      let data = await db.Follow.findOne({
        where: { userId, comicId },
      });
      if (!data) {
        next();
      } else {
        return res.status(200).json({
          data: {
            message: "film đã follow",
            errCode: 1,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errCode: 1,
    });
  }
};
const updateComicMiddleware = async (req, res, next) => {
  try {
    let comicInfo = req.body;
    if (
      comicInfo.name &&
      comicInfo.image &&
      comicInfo.id &&
      comicInfo.description &&
      comicInfo.author &&
      comicInfo.nickName
    ) {
      next();
    } else {
      return res.status(200).json({
        data: {
          message: "missing parametor",
          errCode: 1,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errCode: 1,
    });
  }
};
const updateCategoriesMiddleware = async (req, res, next) => {
  try {
    let comicId = req.body.comicId;
    let categoryId = req.body.categoryId;
    if (!comicId || categoryId.length === 0) {
      return res.status(200).json({
        data: {
          errCode: 1,
          message: "missing parameter",
        },
      });
    } else {
      await db.Comic_Categories.destroy({
        where: { comicId: comicId },
      });
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errCode: 1,
    });
  }
};

module.exports = {
  createComicMiddleware,
  updateComicMiddleware,
  updateCategoriesMiddleware,
};
