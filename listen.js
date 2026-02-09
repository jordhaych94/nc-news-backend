const app = require("./app");
const port = 8080;

app.listen(8080, (err) => {
  if (err) {
    console.log(err, `Not connected to port ${port}`);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
