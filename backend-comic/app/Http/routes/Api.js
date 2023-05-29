const express = require("express");
const ApiConntroller = require("../controllers/ApiController");
const { Authenticate, Login } = require("../middleware/Authenticate");
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
  router.get("/api/getComicByCategory", ApiConntroller.getComicByCategory);
  router.get("/api/getCategoriesByComic", ApiConntroller.getCategoriesByComic);
  router.get(
    "/api/getOnlyChapterbyId",
    ApiConntroller.getOnlyChapterByIdController
  );
  router.post("/api/auth/login", Login, ApiConntroller.authLoginController);
  //post
  router.post("/api/create-comic", ApiConntroller.createComic);
  router.post("/api/create-chapter", ApiConntroller.createChapter);
  router.post("/api/create-category", ApiConntroller.createCategory);
  router.post("/api/create-comment", ApiConntroller.createComment);
  router.post(
    "/api/create-categories-comic",
    ApiConntroller.createCategoryComic
  );
  router.post(
    "/api/create-user",
    Authenticate,
    ApiConntroller.createUserController
  );
  //update
  router.put("/api/update-views", ApiConntroller.updateViews);
  router.put("/api/day-update", ApiConntroller.updateTimePass);

  return app.use("/", router);
};
module.exports = initAPIRoutes;
