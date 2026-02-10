const articles = require("../db/data/test-data/articles");
const {
  getAllArticles: getAllArticlesService,
  getAllArticlesById: getAllArticlesByIdService,
  getAllCommentsByArticleId: getAllCommentsByArticleIdService,
  postAllCommentsByArticleId: postAllCommentsByArticleIdService,
  patchArticleById: patchArticleByIdService,
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
  const promises = [
    getAllCommentsByArticleIdService(article_id),
    getAllArticlesByIdService(article_id),
  ];
  Promise.all(promises)
    .then((result) => {
      const comments = result[0];
      const article = result[1];

      if (article.length === 0) {
        // if article doesnt exsist, do this
        return response.status(404).send({ msg: "Article not found!" });
      } else {
        return response.status(200).send({ comments });
      }
    })
    .catch((err) => {
      if (err.code === "22P02") {
        return response.status(400).send({ msg: "Bad request!" });
      }
      return response.status(500).send({ msg: "Server Error" });
    });
};

exports.postAllCommentsByArticleId = (request, response) => {
  const { article_id } = request.params;
  const newComment = request.body;
  postAllCommentsByArticleIdService(article_id, newComment)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.patchArticleById = (request, response) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  const newVote = request.body;
  console.log(newVote);
  patchArticleByIdService(article_id, inc_votes).then((articles) => {
    if (articles.length === 0) {
      // if article doesnt exsist, do this
      return response.status(404).send({ msg: "Article not found!" });
    } else {
      return response.status(200).send({ article: articles[0] });
    }
  });
};
