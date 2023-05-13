const express = require("express");
<<<<<<< HEAD
const ApiConntroller = require("../controllers/ApiController");
let router = express.Router();
let initAPIRoutes = (app) => {
  router.get("/api/test", ApiConntroller.testApiController);
  router.get("/api/getCatagory", ApiConntroller.getCatagoryController);
  router.get("/api/getComic", ApiConntroller.getComicController);
  return app.use("/", router);
=======
let router = express.Router();
let initAPIRoutes = (app) => {
  router.get("/api/test", (req, res) => {
    return res.send("API TEST");
  });
  return app.get("/api/test", router);
>>>>>>> front-end
};
module.exports = initAPIRoutes;
