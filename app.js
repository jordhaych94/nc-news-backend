const express = require("express");
const topicsRouter = require("./routes/topics.routes");
const articlesRouter = require("./routes/articles.routes");
const usersRouter = require("./routes/users.routes");
const cors = require("cors");



// making the server!
const app = express();
app.use(cors());
//setup!
app.use(express.json());
app.use(express.static("public"));

// linking router (valid endpoints)
app.use("/api/topics", topicsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

//invalid endpoints catch all
app.all("/*path", (request, response, next) => {
  response.status(404).send({ msg: "Bad request, path not Found!" });
});

module.exports = app;
