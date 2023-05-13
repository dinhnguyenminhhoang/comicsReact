const express = require("express");
<<<<<<< HEAD
const connectDB = require("../config/connectDB");
=======
>>>>>>> front-end
const viewEngine = require("../config/viewEngine");
const initWebRoutes = require("./Http/routes/Web");
const bodyParser = require("body-parser");
const initAPIRoutes = require("./Http/routes/Api");
require("dotenv").config();
//
const app = express();
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
viewEngine(app);
initWebRoutes(app);
initAPIRoutes(app);
<<<<<<< HEAD
// connectin db
connectDB();
=======
>>>>>>> front-end
let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("connecting back to port " + port);
});
