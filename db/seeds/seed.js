const db = require("../connection");
const format = require("pg-format");
const objectLookUp = require("../seeds/seed-Util");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE topics(
          slug VARCHAR PRIMARY KEY,
          description VARCHAR,
          img_url VARCHAR(1000))`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users(
          username VARCHAR PRIMARY KEY,
          name VARCHAR,
          avatar_url VARCHAR(1000))`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE articles(
          article_id SERIAL PRIMARY KEY,
          title VARCHAR,
          topic VARCHAR REFERENCES topics(slug),
          author VARCHAR REFERENCES users(username),
          body TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          votes int DEFAULT 0,
          article_img_url VARCHAR(1000))`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE comments(
          comment_id SERIAL PRIMARY KEY,
          article_id INT REFERENCES articles(article_id) NOT NULL,
          body TEXT,
          votes INT DEFAULT 0,
          author VARCHAR REFERENCES users(username),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
    })
    .then(() => {
      const formatedTopics = topicData.map((topic) => {
        return [topic.slug, topic.description, topic.img_url];
      });

      const queryStr = format(
        `INSERT INTO topics (slug, description, img_url) VALUES %L`,
        formatedTopics,
      );

      return db.query(queryStr);
    })
    .then(() => {
      const formatedUsers = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });

      const queryStr = format(
        `INSERT INTO users (username, name, avatar_url) VALUES %L`,
        formatedUsers,
      );

      return db.query(queryStr);
    })
    .then(() => {
      const formatedArticles = articleData.map((article) => {
        return [
          article.title,
          article.topic,
          article.author,
          article.body,
          article.created_at,
          article.votes,
          article.article_img_url,
        ];
      });

      const queryStr = format(
        `INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES %L RETURNING *`,
        formatedArticles,
      );

      return db.query(queryStr);
    })
    .then(({ rows }) => {
      const articleIdLookup = objectLookUp(rows, "title", "article_id"); // formats data to be i.e {"Living in the shadow of a great man": 1}
      const formatedComments = commentData.map((comment) => {
        return [
          articleIdLookup[comment.article_title], // swaps every article_title for article_id - table askes for article_id but data has article_title
          comment.body,
          comment.votes,
          comment.author,
          comment.created_at,
        ];
      });

      const queryStr = format(
        `INSERT INTO comments (article_id, body, votes, author, created_at) VALUES %L`,
        formatedComments,
      );

      return db.query(queryStr);
    });
};

module.exports = seed;
