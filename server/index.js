const { client } = require("./db");
const seed = require("./seed");
const path = require("path");
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "images")));

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await seed();
  console.log("data seeded");

  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
