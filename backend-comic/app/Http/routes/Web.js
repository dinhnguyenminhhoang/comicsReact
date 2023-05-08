const express = require("express");
const WebController = require("../controllers/WebController");
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", WebController.getHomePage);
  return app.use("/", router);
};
module.exports = initWebRoutes;
