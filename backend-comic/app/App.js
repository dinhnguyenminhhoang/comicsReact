const express = require("express");
const connectDB = require("../config/connectDB");
const viewEngine = require("../config/viewEngine");
const initWebRoutes = require("./Http/routes/Web");
const bodyParser = require("body-parser");
const initAPIRoutes = require("./Http/routes/Api");
const cors = require("cors");
require("dotenv").config();
//
const app = express();
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Địa chỉ nguồn chấp nhận truy cập
  })
);
viewEngine(app);
initWebRoutes(app);
initAPIRoutes(app);
// connectin db
connectDB();
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("connecting back to port " + port);
});
