const db = require("../db/connection");

// returns all topics/ returns the query!
exports.fetchAllTopics = () => {
  return db
    .query("SELECT slug, description, img_url FROM topics")
    .then(({ rows }) => {
      return rows;
    });
};
