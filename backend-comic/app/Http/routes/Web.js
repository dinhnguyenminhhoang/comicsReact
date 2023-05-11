const express = require("express");
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("Hoang dz vcl");
  });
  return app.get("/", router);
};
module.exports = initWebRoutes;
