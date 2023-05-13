const express = require("express");
<<<<<<< HEAD
const WebController = require("../controllers/WebController");
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", WebController.getHomePage);
  router.post("/create-user",WebController.createUser)
  router.get("/crud",WebController.getCrud)
  return app.use("/", router);
=======
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("Hoang dz vcl");
  });
  return app.get("/", router);
>>>>>>> front-end
};
module.exports = initWebRoutes;
