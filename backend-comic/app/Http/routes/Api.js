const express = require("express");
const ApiConntroller = require("../controllers/ApiController");
let router = express.Router();
let initAPIRoutes = (app) => {
  //get
  router.get("/api/test", ApiConntroller.testApiController);
  router.get("/api/getCetagory", ApiConntroller.getCetagoryController);
  router.get("/api/getComic", ApiConntroller.getComicController);
  router.get("/api/getChapter", ApiConntroller.getChapterController);
  //post
  router.post("/create-comic", ApiConntroller.createComic);
  router.post("/create-chapter", ApiConntroller.createChapter);
  router.post("/create-category", ApiConntroller.createCategory);
  router.post("/create-comment", ApiConntroller.createComment);
  return app.use("/", router);
};
module.exports = initAPIRoutes;
