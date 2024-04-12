const { client } = require("./db");
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());

const init = async () => {
  await client.connect();
  console.log("connected to database");
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
