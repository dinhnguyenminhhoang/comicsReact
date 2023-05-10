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
let getComicsByType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Comic.findAll({
        include: [
          {
            model: db.Chapter,
            as: "chapters",
            include: [
              {
                model: db.Comment,
                as: "comments", 
              },
            ],
          },
          {
            model: db.Category,
            as: "category",
            through: {
              model: db.Comic_Categories,
              as: "comic_categories",
            },
          },
          {
            model: db.Comment,
            as: "comments",
          },
          {
            model: db.Image,
            as: "images",
          },
        ],
        raw: true,
        nest: true,
      });
      console.log("data: " + data);
      resolve({ data, errcode: 1, message: "get comic successfully" });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { getAllCategories, getComicsByType };
