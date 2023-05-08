const db = require("../../../database/models/index");
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("HomePage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getHomePage,
};
