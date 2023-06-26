const express = require("express");
const router = express.Router();
const db = require("../../../database/models/index");
const { raw } = require("body-parser");
const UserByRoleIdMiddleWare = (req, res, next) => {
  try {
    const role = req.query.roleId;
    console.log(req.query.role);
    if (role === "R1" || role === "R2" || role === "R3") {
      next();
    }
  } catch (error) {
    return res.status(400).json({ errCode: 1, message: "role not found" });
  }
};
const createComicForCollectionMiddleware = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const comicId = req.body.comicId;
    if (userId) {
      let collection = await db.Collection.findOne({
        where: { userId: userId },
        include: [
          {
            model: db.Comic,
            as: "comics",
            where: { id: comicId },
            through: {
              attributes: [], // Bỏ qua thuộc tính của bảng trung gian
            },
          },
        ],
        raw: true,
        nest: true,
      });
      if (!collection) {
        next();
      } else {
        return res.status(200).json({
          message: "truyện đã nằm trong bộ sưu tập",
          errCode: 1,
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
const createCollectionMiddleware = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    if (userId) {
      let data = await db.Collection.findOne({
        where: { collectionId: userId, userId: userId },
      });
      if (!data) {
        next();
      } else {
        return res.status(200).json({
          message: "bô sư tập không thể trùng nhau",
          errCode: 1,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "error from server",
      errCode: 1,
    });
  }
};
const deleteUserMiddleware = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (userId) {
      next();
    } else {
      return res.status(200).json({
        data: {
          message: "userId not found",
          errCode: 1,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "error from server",
      errCode: 1,
    });
  }
};
const updateUserMiddleware = async (req, res, next) => {
  try {
    let data = req.body;
    if (data.email || data.image || data.username || data.id) {
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
    return res.status(500).json({
      message: "error from server",
      errCode: 1,
    });
  }
};
const createCommentMiddleWare = async (req, res, next) => {
  try {
    const { userId, comicId, comment } = req.body;
    if (!userId || !comicId || !comment) {
      return res.status(200).json({
        data: {
          message: "missing parameter",
          errCode: 1,
        },
      });
    }

    const comments = await db.Comment.findAll({
      where: {
        userId,
        comicId,
      },
    });

    if (
      comments &&
      comments.some((commentUser) => commentUser.comment === comment)
    ) {
      return res.status(200).json({
        data: {
          message: "comment đã tồn tại",
          errCode: 1,
        },
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "lỗi từ server",
      errCode: 1,
    });
  }
};

module.exports = {
  UserByRoleIdMiddleWare,
  createComicForCollectionMiddleware,
  createCollectionMiddleware,
  deleteUserMiddleware,
  updateUserMiddleware,
  createCommentMiddleWare,
};
