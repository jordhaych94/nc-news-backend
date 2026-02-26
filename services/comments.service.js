const { fetchDeleteCommentById } = require("../models/comments.model");

exports.deleteCommentById = (comment_id) => {
  return fetchDeleteCommentById(comment_id);
};
