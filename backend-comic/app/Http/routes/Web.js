const express = require("express");
const WebController = require("../controllers/WebController");
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", WebController.getHomePage);
  router.post("/create-user",WebController.createUser)
  router.get("/crud",WebController.getCrud)
  return app.use("/", router);
};
module.exports = initWebRoutes;
