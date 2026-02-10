const {
  fetchAllArticles,
  fetchAllArticlesById,
  fetchAllCommentsByArticleId,
  fetchPostAllCommentsByAtricleId,
  fetchPatchArticleById,
} = require("../models/articles.model");

// all logic goes here!
exports.getAllArticles = () => {
  return fetchAllArticles();
};

exports.getAllArticlesById = (article_Id) => {
  return fetchAllArticlesById(article_Id);
};

exports.getAllCommentsByArticleId = (article_Id) => {
  return fetchAllCommentsByArticleId(article_Id);
};

exports.postAllCommentsByArticleId = (article_Id, newComment) => {
  return fetchPostAllCommentsByAtricleId(article_Id, newComment);
};

exports.patchArticleById = (article_Id, inc_votes) => {
  return fetchPatchArticleById(article_Id, inc_votes);
};
