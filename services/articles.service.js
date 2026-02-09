const {
  fetchAllArticles,
  fetchAllArticlesById,
  fetchAllCommentsByArticleId,
  fetchPostAllCommentsByAtricleId,
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

exports.postAllCommentsByAtricleId = (article_Id, newComment) => {
  return fetchPostAllCommentsByAtricleId(article_Id, newComment);
};
