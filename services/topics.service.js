const { fetchAllTopics } = require("../models/topics.model");

// all logic goes here!
exports.getAllTopics = () => {
  return fetchAllTopics();
};
