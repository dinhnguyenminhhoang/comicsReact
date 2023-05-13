const express = require("express");
const WebController = require("../controllers/WebController");
let router = express.Router();
let initWebRoutes = (app) => {
  //get
  router.get("/", WebController.getHomePage);
  router.get("/crud", WebController.getCrud);
  //post
  router.post("/create-user", WebController.createUser);
  //
  return app.use("/", router);
};
module.exports = initWebRoutes;
