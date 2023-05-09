const db = require("../../../database/models/index");
const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        email: data.email,
        passWord: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
      });
      resolve("create user successfully");
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = db.User.findAll();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { createUser, getAllUsers };
