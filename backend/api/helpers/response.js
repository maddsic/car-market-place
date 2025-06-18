const fs = require("fs").promises;
const path = require("path");

const { User } = require("../models");

// verifies that the user has records
exports.hasRecords = async (user) => {
  return user
    ? {
        accept: true,
        data: user,
        status: 201,
      }
    : {
        accept: false,
        data: {
          success: false,
          message: "No record(s) found.",
        },
        status: 404,
      };
};

exports.hasLength = (data) => {
  return (data && data.length > 0) || (data && Object.keys(data).length > 0);
};

exports.hasError = (error) => {
  return {
    error: true,
    status: 500,
    success: false,
    result: {
      message: error,
    },
  };
};

// Find User records by email
exports.findUser = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });

    return this.hasRecords(user);
  } catch (error) {
    console.log("ERROR FROM FIND USER HELPER");
    console.log(error.message);
  }
};

// Custom create function
exports.createUser = async (form) => {
  try {
    const newUser = await User.create(form);
    return this.hasRecords(newUser);
  } catch (error) {
    console.log("ERROR FROM CREATE USER HELPER");
    console.log(error.message);
    throw error;
  }
};

// Custom response
exports.sendResponse = async (res, statusCode, success, message, data = []) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
