const express = require("express");
const ApiConntroller = require("../controllers/ApiController");
let router = express.Router();
let initAPIRoutes = (app) => {
  //get
  router.get("/api/test", ApiConntroller.testApiController);
  router.get("/api/getCetagory", ApiConntroller.getCetagoryController);
  router.get("/api/getComic", ApiConntroller.getComicController);
  router.get("/api/getChapter", ApiConntroller.getChapterController);
  router.get("/api/getChapterbyId", ApiConntroller.getChapterByIdController);
  router.get("/api/getAllComic", ApiConntroller.getAllComic);
  router.get("/api/getPagination", ApiConntroller.getPagination);
  router.get("/api/getComicById", ApiConntroller.getComicById);
  //post
  router.post("/api/create-comic", ApiConntroller.createComic);
  router.post("/api/create-chapter", ApiConntroller.createChapter);
  router.post("/api/create-category", ApiConntroller.createCategory);
  router.post("/api/create-comment", ApiConntroller.createComment);
  return app.use("/", router);
};
module.exports = initAPIRoutes;
