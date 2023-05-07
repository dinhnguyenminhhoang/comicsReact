const express = require("express");

let configViewEngine = (app) => {
  app.use(express.static("../resources/assets"));
  app.set("view engine", "ejs");
  app.set("views", "../resources/views");
};
module.exports = configViewEngine;
