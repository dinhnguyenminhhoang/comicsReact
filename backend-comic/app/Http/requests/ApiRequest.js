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
let getComicsByType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Comic.findAll({
        include: [
          {
            model: db.Chapter,
            as: "chapters",
            attributes: ["name", "content", "numericalOrder", "comicId"],
            include: [
              {
                model: db.Comment,
                as: "comments",
                attributes: ["comment"],
              },
            ],
          },
          {
            model: db.Category,
            as: "category",
            attributes: ["name", "description"],
            through: {
              model: db.Comic_Categories,
              as: "comic_categories",
              attributes: ["comicId", "categoryId"],
            },
          },
          {
            model: db.Comment,
            as: "comments",
            attributes: ["comment"],
          },
          {
            model: db.Image,
            as: "images",
            attributes: ["url"],
          },
        ],
        attributes: ["name", "author", "description", "views", "image"],
        raw: true,
        nest: true,
      });
      resolve({ data, errcode: 1, message: "get comic successfully" });
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
            include: [
              {
                model: db.Category,
                as: "category",
                through: {
                  attributes: [],
                },
              },
            ],
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
          message: "get chapter is falied",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleCreateComic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.name) {
        await db.Comic.create({
          name: data.name,
          author: data.author,
          description: data.description,
          views: data.views || 0,
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
      if (data || data.comicId) {
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
module.exports = {
  getAllCategories,
  handleGetChapter,
  handleCreateComic,
  handleCreateChapter,
  handleCreateCategory,
  handleCreateComment,
};
