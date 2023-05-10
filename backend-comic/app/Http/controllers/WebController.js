const db = require("../../../database/models/index");
const WebRequest = require("../requests/WebRequest");
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("HomePage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};
let createUser = async (req, res) => {
  try {
    let data = await WebRequest.createUser(req.body);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  return res.render("createUser.ejs");
};
let getCrud = async (req, res) => {
  let data = await WebRequest.getAllUsers();
  return res.render("CRUD.ejs", { data });
};
module.exports = {
  getHomePage,
  createUser,
  getCrud,
};
