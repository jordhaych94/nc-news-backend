const {
  deleteCommentById: deleteCommentByIdService,
} = require("../services/comments.service");

exports.deleteCommentById = (request, response) => {
  const { comment_id } = request.params;
  deleteCommentByIdService(comment_id).then(() => {
    return response.status(204).send();
  });
};
