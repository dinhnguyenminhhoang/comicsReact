const express = require("express");
let router = express.Router();
let initAPIRoutes = (app) => {
  router.get("/api/test", (req, res) => {
    return res.send("API TEST");
  });
  return app.get("/api/test", router);
};
module.exports = initAPIRoutes;
