const db = require("../db/connection");

// returns all users/ returns the query!
exports.fetchAllUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows }) => {
    return rows;
  });
};
