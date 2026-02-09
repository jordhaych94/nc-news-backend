const {
  getAllTopics: getAllTopicsService,
} = require("../services/topics.service");

// handles the request, responce (http)!
exports.getAllTopics = (request, response) => {
  getAllTopicsService().then((topics) => {
    return response.status(200).send({ topics });
  });
};
