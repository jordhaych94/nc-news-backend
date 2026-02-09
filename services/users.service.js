const { fetchAllUsers } = require("../models/users.model");

// all logic goes here!
exports.getAllUsers = () => {
  return fetchAllUsers();
};
