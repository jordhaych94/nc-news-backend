const express = require("express");
const {
  getAllArticles,
  getAllArticlesById,
  getAllCommentsByArticleId,
} = require("../controllers/articles.controller");

const router = express.Router();

// end points connected to relivent controller!
router.get("/", getAllArticles); // GET '/api/articles'
router.get("/:article_id", getAllArticlesById);
router.get("/:article_id/comments", getAllCommentsByArticleId);

module.exports = router;
