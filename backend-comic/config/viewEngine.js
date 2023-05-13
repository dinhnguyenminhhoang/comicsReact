const express = require("express");

let configViewEngine = (app) => {
<<<<<<< HEAD
  app.use(express.static("./resources/assets"));
  app.set("view engine", "ejs");
  app.set("views", "./resources/views");
=======
  app.use(express.static("../resources/assets"));
  app.set("view engine", "ejs");
  app.set("views", "../resources/views");
>>>>>>> front-end
};
module.exports = configViewEngine;
