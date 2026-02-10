const express = require("express");
const {
  getAllArticles,
  getAllArticlesById,
  getAllCommentsByArticleId,
  postAllCommentsByArticleId,
  patchArticleById,
} = require("../controllers/articles.controller");

const router = express.Router();

// end points connected to relivent controller!
router.get("/", getAllArticles); // GET '/api/articles'
router.get("/:article_id", getAllArticlesById);
router.get("/:article_id/comments", getAllCommentsByArticleId);
router.post("/:article_id/comments", postAllCommentsByArticleId);
router.patch("/:article_id", patchArticleById);

module.exports = router;
