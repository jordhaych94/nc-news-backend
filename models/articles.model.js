const db = require("../db/connection");

// returns all articles/ returns the query!
exports.fetchAllArticles = () => {
  return db
    .query(
      `SELECT articles.author, title, articles.article_id, topic, articles.created_at, articles.votes, article_img_url, COUNT(comments.article_id) :: int AS comment_count 
      FROM articles 
      LEFT JOIN comments ON articles.article_id = comments.article_id 
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC
      `,
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchAllArticlesById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchAllCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments 
       WHERE article_id = $1 
       ORDER BY created_at DESC;`,
      [article_id],
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchPostAllCommentsByAtricleId = (article_id, newComment) => {
  const { username, body } = newComment;
  console.log(username);
  return db
    .query(
      `
    insert into comments(article_id, author, body) VALUES ($1, $2, $3) RETURNING *
    `,
      [article_id, username, body],
    )
    .then(({ rows }) => {
      console.log("rows -->", rows);
      return rows[0];
    });
};
