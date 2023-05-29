const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const db = require("../../../database/models/index");

const saltRounds = 10;

const Authenticate = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const users = await db.User.findAll();

    const normalizedEmailClient = email.toLowerCase();
    const normalizedUsernameClient = username.toLowerCase();

    const isEmailExists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmailClient
    );

    const isUsernameExists = users.some(
      (user) => user.username.toLowerCase() === normalizedUsernameClient
    );

    if (isEmailExists) {
      return res.status(200).json({
        data: {
          errCode: 1,
          message: "email đã tồn tại",
        },
      });
    }

    if (isUsernameExists) {
      return res.status(200).json({
        data: {
          errCode: 1,
          message: "username đã tồn tại",
        },
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: {
        errCode: 1,
        message: "Lỗi server",
      },
    });
  }
};
const comparePasswords = async (
  clientHashedPassword,
  databaseHashedPassword
) => {
  try {
    const isMatch = await bcrypt.compare(
      clientHashedPassword,
      databaseHashedPassword
    );
    return isMatch;
  } catch (error) {
    console.error("Lỗi trong quá trình so sánh mật khẩu:", error);
    throw error;
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let data = await db.User.findOne({ where: { email: email } });
    if (data) {
      const isPasswordMatch = await comparePasswords(password, data.password);
      isPasswordMatch
        ? (req.body.isPassword = true)
        : (req.body.isPassword = false);
      next();
    } else {
      return res.status(200).send({
        data: {
          message: "email không chính xác",
          errCode: 1,
          isEmail: false,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      data: {
        errCode: 1,
        message: "Lỗi server",
      },
    });
  }
};

module.exports = { Authenticate, Login };
