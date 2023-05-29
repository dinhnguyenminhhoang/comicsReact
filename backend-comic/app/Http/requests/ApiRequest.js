const e = require("express");
const db = require("../../../database/models/index");
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
      console.error(error);
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
      console.error(error);
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
      console.log(error);
      reject({ error: 1, message: "error" });
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
let handleCreateComment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.userId && (data.chapterId || data.comicId)) {
        await db.Comment.create({
          comicId: data.comicId,
          userId: data.userId,
          chapterId: data.chapterId,
          comment: data.comment,
        });
        resolve({
          errCode: 0,
          message: "create comment is successfully",
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
          image: data.image || null,
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
      console.log(error);
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
  //
  handleCreateComic,
  handleCreateChapter,
  handleCreateCategory,
  handleCreateComment,
  handleCreateCategoryComic,
  createUser,
  //
  handleUpdateViews,
  handleUpdateTimePass,
};
