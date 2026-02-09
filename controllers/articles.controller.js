const {
  getAllArticles: getAllArticlesService,
  getAllArticlesById: getAllArticlesByIdService,
  getAllCommentsByArticleId: getAllCommentsByArticleIdService,
} = require("../services/articles.service");

// handles the request, responce (http)!
exports.getAllArticles = (request, response) => {
  getAllArticlesService()
    .then((articles) => {
      return response.status(200).send({ articles });
    })
    .catch((err) => {
      return response.status(500).send({ msg: "Server Error" });
    });
};

exports.getAllArticlesById = (request, response) => {
  const article_id = request.params.article_id;
  getAllArticlesByIdService(article_id)
    .then((articles) => {
      if (articles.length === 0) {
        return response.status(404).send({ msg: "Article not found!" });
      } else {
        return response.status(200).send({ articles });
      }
    })
    .catch((err) => {
      if (err.code === "22P02") {
        return response.status(400).send({ msg: "Bad request!" });
      }
      return response.status(500).send({ msg: "Server Error" });
    });
};

exports.getAllCommentsByArticleId = (request, response) => {
  const { article_id } = request.params;
  getAllCommentsByArticleIdService(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      if (err.code === "22P02") {
        return response.status(400).send({ msg: "Bad request!" });
      }
      return response.status(500).send({ msg: "Server Error" });
    });
};
