const { client, createTables, createUser, fetchUsers } = require("./db");
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
app.use(require("morgan")("dev"));
app.use(express.json());

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await createTables();
  console.log("tables created");
  const [Kayla, Dave, Sarah] = await Promise.all([
    createUser({
      firstName: "Kayla",
      lastName: "White",
      email: "kayla@example.com",
      phoneNumber: "1234567810",
      password: "shhh",
      is_admin: false,
    }),
    createUser({
      firstName: "Dave",
      lastName: "Brown",
      email: "dave@example.com",
      phoneNumber: "1111111111",
      password: "shhhhi",
      is_admin: false,
    }),
    createUser({
      firstName: "Sarah",
      lastName: "Green",
      email: "sarah@example.com",
      phoneNumber: "1231231234",
      password: "secret",
      is_admin: true,
    }),
  ]);

  console.log(await fetchUsers());
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
