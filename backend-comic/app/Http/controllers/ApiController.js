const ApiRequest = require("../requests/ApiRequest");
let testApiController = (req, res) => {
  return res.send("testApiController");
};
let getCatagoryController = async (req, res) => {
  try {
    let data = await ApiRequest.getAllCategories();
    if (data.errCode === 0) {
      return res.status(200).json({
        data,
      });
    } else if (data.errCode === 1) {
      return res.status(404).json({
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
let getComicController = async (req, res) => {
  try {
    let data = await ApiRequest.getComicsByType();
    console.log(data);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  testApiController,
  getCatagoryController,
  getComicController,
};
