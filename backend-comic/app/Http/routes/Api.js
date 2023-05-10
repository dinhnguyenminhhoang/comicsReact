const express = require("express");
const ApiConntroller = require("../controllers/ApiController");
let router = express.Router();
let initAPIRoutes = (app) => {
  router.get("/api/test", ApiConntroller.testApiController);
  router.get("/api/getCatagory", ApiConntroller.getCatagoryController);
  router.get("/api/getComic", ApiConntroller.getComicController);
  return app.use("/", router);
};
module.exports = initAPIRoutes;
