const e = require("express");
const db = require("../../../database/models/index");
const { raw } = require("body-parser");
const { totalMonth } = require("../../utils/totalMonth");
const { totalDays } = require("../../utils/totalDays");
const { totaHour } = require("../../utils/totaHour");
const { Op } = require("sequelize");
let getAllCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Category.findAll();
      if (data) {
        resolve({
          data,
          errCode: 0,
          message: "get all categories successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "get all categories failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getComicsByType = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Comic.findAll({
        limit: limit,
        order: [["dayUpdated", "DESC"]],
        raw: true,
        nest: true,
      });
      resolve({ data, errcode: 0, message: "get comic successfully" });
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetChapter = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Chapter.findAll({
        include: [
          {
            model: db.Comic,
            as: "comics",
          },
        ],
        raw: true,
        nest: true,
      });
      if (data) {
        resolve({
          data,
          errcode: 0,
          message: "get chapter successfully",
        });
      } else {
        reject({
          errCode: 1,
          message: "get chapter is failed",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetChapterById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Chapter.findAll({
        where: { comicId: id },
        order: [["updatedAt", "DESC"]],
      });
      if (data.length > 0) {
        resolve({
          data,
          errCode: 0,
          message: "get chapter bye id successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "truyện chưa có chương nào",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetAllComic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Comic.findAll({
        order: [["dayUpdated", "DESC"]],
      });
      if (data) {
        resolve({
          data,
          errCode: 0,
          message: "get comic is successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: " errr form  server",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll();
      if (data) {
        resolve({
          data,
          errCode: 0,
          message: "get user is successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: " errr form  server",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetPagination = (pageNumber, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      let offset = (pageNumber - 1) * pageSize;
      let limit = pageSize;
      const totalCount = await db.Comic.count();
      const totalPage = Math.ceil(totalCount / pageSize);
      let data = await db.Comic.findAll({
        offset,
        limit,
        order: [["dayUpdated", "DESC"]],
      });
      if (data && totalCount) {
        resolve({
          data,
          totalPage,
          errCode: 0,
          message: "get pages are successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "get pages falied",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetComicById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Comic.findOne({
        where: { id: id },
      });
      if (data) {
        resolve({
          data,
          errCode: 0,
          message: "get Comic by id successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "id not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetComicByCategory = (categoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comics = await db.Comic.findAll({
        include: [
          {
            model: db.Category,
            as: "categories",
            where: { id: categoryId },
            through: {
              attributes: [],
            },
          },
        ],
        // attributes: {
        //   exclude: ["createdAt", "updatedAt"],
        // },
        raw: true,
        nest: true,
      });

      if (comics.length > 0) {
        resolve({
          comics,
          errCode: 0,
          message: "Get comics by category successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "No comics found for the given category",
        });
      }
    } catch (error) {
      reject("An error occurred while retrieving comics by category");
    }
  });
};
let handleGetcategoriesByComic = (comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let categories = await db.Category.findAll({
        include: [
          {
            model: db.Comic,
            as: "comics",
            where: { id: comicId },
            through: {
              attributes: [],
            },
            attributes: [],
          },
        ],

        raw: true,
        nest: true,
      });

      if (categories.length > 0) {
        resolve({
          categories,
          errCode: 0,
          message: "Get comics by category successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "No comics found for the given category",
        });
      }
    } catch (error) {
      reject("An error occurred while retrieving comics by category");
    }
  });
};
let handleGetOnlyChapterByIdController = (chapterId, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!chapterId || !comicId)
        resolve({ errCode: 1, message: "chapterID not found" });
      let data = await db.Chapter.findOne({
        where: { comicId: comicId, id: chapterId },
      });
      if (data) {
        resolve({
          data,
          errCode: 0,
          message: "get chapter by id successfully",
        });
      } else {
        resolve({
          message: "chapter not found",
          errCode: 1,
        });
      }
    } catch (error) {
      reject({ error: 1, message: "error" });
    }
  });
};
let handleGetUserInfo = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
        attributes: ["email", "image", "username", "roleId", "id"],
      });
      if (user) {
        resolve({
          user,
          message: "get user info successfully",
          errCode: 0,
        });
      } else {
        reject({ error: 1, message: "email not found" });
      }
    } catch (error) {
      reject({ error: 1, message: "error getting user info" });
    }
  });
};
let handleGetTotalUser = (roleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.User.findAll();
      if (data && data.length > 0) {
        const totalUser = data.length;
        let monthlyUser = totalMonth(data);
        const daylyUsers = totalDays(data);
        const hourslyUsers = totaHour(data);
        resolve({
          errCode: 0,
          message: "get total user info successfully",
          totalUser,
          monthlyUser,
          daylyUsers,
          hourslyUsers,
        });
      }
      resolve({ errCode: 1, message: "user not found" });
    } catch (error) {
      reject({ error: 1, message: "error getting user info" });
    }
  });
};
let handleGetTotalChapter = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Chapter.findAll();
      if (data && data.length > 0) {
        const totalChapters = data.length;
        let monthlyChapters = totalMonth(data);
        let daylyChapters = totalDays(data);
        let hourslyChapters = totaHour(data);

        resolve({
          errCode: 0,
          message: "get total chapters are successfully",
          totalChapters,
          monthlyChapters,
          daylyChapters,
          hourslyChapters,
        });
      }
      resolve({ errCode: 1, message: "chapter not found" });
    } catch (error) {
      reject({ error: 1, message: "error getting chapter info" });
    }
  });
};
let handleGetTotalComic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Comic.findAll();
      if (data && data.length > 0) {
        const totalComics = data.length;
        let monthlyComics = totalMonth(data);
        let daylyComics = totalDays(data);
        let hourlyComics = totaHour(data);
        resolve({
          errCode: 0,
          message: "get total comics are successfully",
          totalComics,
          monthlyComics,
          daylyComics,
          hourlyComics,
        });
      }
      resolve({ errCode: 1, message: "comic not found" });
    } catch (error) {
      reject({ error: 1, message: "error getting comic info" });
    }
  });
};
let handleGetCollection = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Collection.findAll({
        where: { userId },
        attributes: ["collectionId", "userId"],
        include: [
          {
            model: db.Comic,
            as: "comics",
            through: {
              attributes: [], // Bỏ qua thuộc tính của bảng trung gian
            },
          },
        ],
        raw: true,
        nest: true,
      });
      if (data) {
        resolve({
          data,
          message: "get collection successfully",
          errCode: 0,
        });
      } else {
        resolve({
          message: "data not found",
          errCode: 1,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetFollow = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findAll({
        where: { id: userId },
        attributes: [],
        include: {
          model: db.Follow,
          as: "follows",
          attributes: [],
          include: {
            model: db.Comic,
            as: "comic",
          },
        },
        raw: true,
        nest: true,
      });
      const followedComics = data.flatMap((follows) => {
        return follows.follows.comic;
      });
      if (followedComics && followedComics[0].id) {
        resolve({
          data: followedComics,
          message: "get collection successfully",
          errCode: 0,
        });
      } else {
        resolve({
          message: "data not found",
          errCode: 1,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleGetFollowByComic = (comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { count } = await db.Follow.findAndCountAll({
        where: {
          comicId,
        },
      });
      resolve({
        data: count || 0,
        message: "get collection successfully",
        errCode: 0,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let handleSearch = (searchContent, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Comic.findAll({
        where: {
          name: {
            [Op.like]: `%${searchContent}%`,
          },
        },
        limit: type,
        attributes: ["name", "author", "image", "id"],
      });
      const totalCount = await db.Comic.count({
        where: {
          name: {
            [Op.like]: `%${searchContent}%`,
          },
        },
      });

      if (data && data.length > 0) {
        resolve({
          data,
          totalCount,
          message: "get collection successfully",
          errCode: 0,
        });
      } else {
        resolve({
          message: "không tìm thấy truyện tương ứng",
          errCode: 1,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const handleGetComment = (comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findAll({
        attributes: ["username", "image", "id"],
        include: {
          model: db.Comment,
          as: "comments",
          where: { comicId },
          attributes: ["comicId", "comment", "postDateComment", "id"],
        },
        raw: true,
        nest: true,
      });
      if (data && data.length > 0) {
        resolve({
          data,
          message: "get comment successfully",
          errCode: 0,
        });
      } else {
        resolve({
          errCode: 1,
          message: "comment not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
////////////////////////////////////////////////////////////////
let handleCreateComic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.name) {
        await db.Comic.create({
          name: data.name,
          author: data.author,
          description: data.description,
          image: data.image,
          views: data.views || 0,
          dayUpdated: new Date(),
          nickName: data.nickName,
        });
        resolve({
          errCode: 0,
          message: "create comic is successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "missing required parameter",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleCreateChapter = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.comicId && data.content) {
        await db.Chapter.create({
          name: data.name || data.numericalOrder,
          content: data.content,
          numericalOrder: data.numericalOrder,
          views: data.views || 0,
          comicId: data.comicId,
        });
        resolve({
          errCode: 0,
          message: "create chapter is successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "missing required parameter",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleCreateCategory = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data || data.name) {
        await db.Category.create({
          name: data.name,
          description: data.description,
        });
        resolve({
          errCode: 0,
          message: "create category is successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "missing required parameter",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleCreateComment = (userId, comicId, comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comment.create({
        comicId: comicId,
        userId: userId,
        comment: comment,
        postDateComment: Date(),
      });
      resolve({
        errCode: 0,
        message: "create comment is successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let handleCreateCategoryComic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.comicId && data.categoryId) {
        const comicId = data.comicId;
        const categoryId = data.categoryId;
        db.Comic.findByPk(comicId)
          .then((comic) => {
            if (comic) {
              db.Category.findAll({
                where: {
                  id: categoryId,
                },
              }).then((categories) => {
                const categories_comic = categories.map((category) => ({
                  comicId: comic.id,
                  categoryId: category.id,
                }));

                db.Comic_Categories.bulkCreate(categories_comic)
                  .then(() => {
                    resolve({
                      errCode: 0,
                      message: "Added a category for success stories",
                    });
                  })
                  .catch((error) => {
                    resolve({
                      error: 1,
                      message: "Added a category for failed stories",
                      error: error,
                    });
                  });
              });
            } else {
              resolve({
                errCode: 1,
                message: "Can't find stories with ID",
              });
            }
          })
          .catch((error) => {
            resolve({
              message: "Error when searching for stories:",
              errCode: 1,
              error,
            });
          });
      }
    } catch (error) {
      reject({
        errCode: 1,
        message: error,
      });
    }
  });
};
const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.email && data.password && data.username) {
        await db.User.create({
          email: data.email,
          password: data.password,
          username: data.username,
          image:
            data.image ||
            "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg",
          roleId: data.roleId || "R1",
        });
        resolve({
          errCode: 0,
          message: "create user successfully",
        });
      } else {
        resolve({ errCode: 1, message: "data not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.isPassword) {
        resolve({
          errCode: 0,
          isPassword: data.isPassword,
          message: "login is successfully",
        });
      } else if (data && data.isPassword === false) {
        resolve({
          errCode: 1,
          message: "password không chính xác",
          isPassword: data.isPassword,
        });
      }
    } catch (error) {
      reject({ errCode: 1, message: "err" });
    }
  });
};
let handleCreateComicForColection = (comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (comicId) {
        await db.Collection_Comics.create({
          ComicId: comicId,
          collectionId: 1,
        });
        resolve({
          errCode: 0,
          message: "add comic for collection successfully",
        });
      } else {
        resolve({ errCode: 1, message: "data not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleCreateColection = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userId) {
        await db.Collection.create({
          collectionId: userId,
          userId: userId,
        });
        resolve({
          errCode: 0,
          message: "create collection successfully",
        });
      } else {
        resolve({ errCode: 1, message: "data not found" });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleCreateFollow = (userId, comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Follow.create({
        userId,
        comicId,
      });
      resolve({
        data: {
          errCode: 0,
          message: "create follow successfully",
        },
      });
    } catch (error) {
      reject(error);
    }
  });
};
//update
let handleUpdateViews = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comic = await db.Comic.findOne({
        where: { id: id },
      });
      if (comic) {
        let viewed = comic.views;
        await db.Comic.update(
          { views: viewed + 1 },
          {
            where: {
              id: id,
            },
          }
        );
        resolve({
          errCode: 0,
          message: "Update view successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "comic not found",
        });
      }
    } catch (error) {
      reject({
        error: 1,
        message: "update view failed",
      });
    }
  });
};
let handleUpdateTimePass = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        await db.Comic.update(
          { dayUpdated: Date() },
          {
            where: {
              id,
            },
          }
        );
        resolve({
          errCode: 0,
          message: "Update view successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "comic not found",
        });
      }
    } catch (error) {
      reject({
        error: 1,
        message: "update view failed",
      });
    }
  });
};
let handleUpdateUser = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userInfo.roleId) {
        await db.User.update(
          {
            email: userInfo.email,
            username: userInfo.username,
            image: userInfo.image,
            roleId: userInfo.roleId,
          },
          {
            where: {
              id: userInfo.id,
            },
          }
        );
      } else {
        await db.User.update(
          {
            email: userInfo.email,
            username: userInfo.username,
            image: userInfo.image,
          },
          {
            where: {
              id: userInfo.id,
            },
          }
        );
      }
      resolve({
        errCode: 0,
        message: "Update view successfully",
      });
    } catch (error) {
      reject({
        error: 1,
        message: "update user failed",
      });
    }
  });
};
let handleUpdateComic = (comicInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comic.update(
        {
          name: comicInfo.name,
          author: comicInfo.author,
          image: comicInfo.image,
          description: comicInfo.description,
          nickName: comicInfo.nickName,
        },
        {
          where: {
            id: comicInfo.id,
          },
        }
      );
      resolve({
        errCode: 0,
        message: "Update comic successfully",
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: "update view failed",
      });
    }
  });
};
const handleUpdateComment = (comment) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comment.update(
        {
          comment: comment.comment,
        },
        {
          where: {
            id: comment.id,
          },
        }
      );
      resolve({
        errCode: 0,
        message: "Update comment successfully",
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: "update view failed",
      });
    }
  });
};
//delete
let handleDeleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDelete = await db.User.destroy({
        where: {
          id: userId,
        },
      });
      if (userDelete) {
        resolve({
          errCode: 0,
          message: "delete user successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "user not found",
        });
      }
    } catch (error) {
      reject({
        error: 1,
        message: "delete user failed",
      });
    }
  });
};
let handleDeleteComic = (comicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comicDelete = await db.Comic.destroy({
        where: {
          id: comicId,
        },
      });
      if (comicDelete) {
        await db.Follow.destroy({ where: { comicId } });
        await db.Comic_Categories.destroy({ where: { comicId } });
        resolve({
          errCode: 0,
          message: "delete comic successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "comic not found",
        });
      }
    } catch (error) {
      reject({
        error: 1,
        message: "delete comic failed",
      });
    }
  });
};
const handleDeleteComment = (commentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let commentDelete = await db.Comment.destroy({
        where: {
          id: commentId,
        },
      });
      if (commentDelete) {
        resolve({
          errCode: 0,
          message: "delete comment successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "delete comment failed",
        });
      }
    } catch (error) {
      reject({
        error: 1,
        message: "delete comic failed",
      });
    }
  });
};
module.exports = {
  handleLogin,
  getComicsByType,
  getAllCategories,
  handleGetChapter,
  handleGetChapterById,
  handleGetAllComic,
  handleGetPagination,
  handleGetComicById,
  handleGetComicByCategory,
  handleGetcategoriesByComic,
  handleGetOnlyChapterByIdController,
  handleGetUserInfo,
  handleGetTotalUser,
  handleGetTotalChapter,
  handleGetTotalComic,
  handleGetCollection,
  handleGetFollow,
  handleGetAllUser,
  handleGetFollowByComic,
  handleSearch,
  handleGetComment,
  //
  handleCreateComic,
  handleCreateChapter,
  handleCreateCategory,
  handleCreateComment,
  handleCreateCategoryComic,
  createUser,
  handleCreateColection,
  handleCreateComicForColection,
  handleCreateFollow,
  //
  handleUpdateViews,
  handleUpdateTimePass,
  handleUpdateUser,
  handleUpdateComic,
  handleUpdateComment,
  //delete
  handleDeleteUser,
  handleDeleteComic,
  handleDeleteComment,
};
