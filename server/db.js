const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/capestone_db"
);
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS userFoodItems;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS foodItems;
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        firstName VARCHAR(25),
        lastName VARCHAR(25),
        email VARCHAR(20) UNIQUE NOT NULL,
        phoneNumber VARCHAR(25),
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE
    );
    CREATE TABLE foodItems(
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        image VARCHAR(255),
        price INTEGER NOT NULL,
        category VARCHAR(100) NOT NULL,
        inventory INTEGER DEFAULT 5 NOT NULL
    );
    CREATE TABLE userFoodItems(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        foodItem_id UUID REFERENCES foodItems(id) ON DELETE CASCADE NOT NULL,
        quantity INTEGER NOT NULL,
        purchased BOOLEAN DEFAULT FALSE
        );
    `;
  await client.query(SQL);
};

const createUser = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  is_admin,
}) => {
  const SQL = `
    INSERT INTO users(id, firstName, lastName, email, phoneNumber, password, is_admin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
  const response = await client.query(SQL, [
    uuid.v4(),
    firstName,
    lastName,
    email,
    phoneNumber,
    await bcrypt.hash(password, 5),
    is_admin,
  ]);
  return response.rows[0];
};

const createFoodItem = async ({
  name,
  description,
  image,
  price,
  category,
  inventory,
}) => {
  const SQL = `
  INSERT INTO foodItems(id, name, description, image, price, category, inventory) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuid.v4(),
    name,
    description,
    image,
    price,
    category,
    inventory,
  ]);
  return response.rows[0];
};

const fetchFoodItems = async () => {
  const SQL = `
        SELECT * FROM foodItems;
        `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchUsers = async () => {
  const SQL = `
SELECT * FROM users
`;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = {
  client,
  createTables,
  createUser,
  createFoodItem,
  fetchFoodItems,
  fetchUsers,
};
