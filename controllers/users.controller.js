const {
  getAllUsers: getAllUsersService,
} = require("../services/users.service");

// handles the request, responce (http)!
exports.getAllUsers = (request, response) => {
  getAllUsersService().then((users) => {
    return response.status(200).send({ users });
  });
};
