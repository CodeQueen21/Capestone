const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/capestone_db"
);
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "shhh";

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

const updateUser = async ({ id, email, phoneNumber }) => {
  const SQL = `
    UPDATE users
    SET email = $1, phoneNumber = $2
    WHERE id = $3 RETURNING *;
    `;
  const response = await client.query(SQL, [email, phoneNumber, id]);
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

const updateFoodItem = async ({
  id,
  name,
  description,
  image,
  price,
  category,
  inventory,
}) => {
  const SQL = `
    UPDATE foodItems
    SET name = $1, description = $2, image = $3, price = $4, category = $5, inventory = $6
    WHERE id = $7 RETURNING *;
    `;
  const response = await client.query(SQL, [
    name,
    description,
    image,
    price,
    category,
    inventory,
    id,
  ]);
  return response.rows[0];
};

const deleteFoodItem = async ({ id }) => {
  const SQL = `
    DELETE
    FROM foodItems
    WHERE id = $1
    `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const issueUserToken = async (id) => {
  return await jwt.sign({ id }, JWT);
};

const createUserFoodItems = async ({
  user_id,
  foodItem_id,
  quantity,
  purchased,
}) => {
  const SQL = `
    INSERT INTO userFoodItems(id, user_id, foodItem_id, quantity, purchased) VALUES($1, $2, $3, $4, $5) RETURNING *;
    `;
  const response = await client.query(SQL, [
    uuid.v4(),
    user_id,
    foodItem_id,
    quantity,
    purchased,
  ]);
  return response.rows[0];
};

const updateUserFoodItem = async ({ id, quantity, purchased }) => {
  const SQL = `
    UPDATE userFoodItems
    SET quantity = $1, purchased = $2
    WHERE id = $3 RETURNING *;
    `;
  const response = await client.query(SQL, [quantity, purchased, id]);
  return response.rows[0];
};

const deleteUserFoodItem = async ({ id }) => {
  const SQL = `
    DELETE
    FROM userFoodItems
    WHERE id = $1
    `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const fetchUserFoodItems = async () => {
  const SQL = `
    SELECT * FROM userFoodItems;
    `;
  const response = await client.query(SQL);
  return response.rows;
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

const fetchSingleUser = async ({ id }) => {
  const SQL = `
    SELECT id, firstname, lastname, email, phonenumber, is_admin FROM users WHERE id = $1;
    `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};
const fetchSingleUserFoodItem = async ({ id }) => {
  const SQL = `
    SELECT * FROM userFoodItems WHERE id = $1;
    `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const fetchSingleFoodItem = async ({ id }) => {
  const SQL = `
      SELECT * FROM foodItems WHERE id = $1;
      `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const authenticate = async (email, password) => {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE email = $1
    `;
  const response = await client.query(SQL, [email]);
  const userInfo = response.rows;
  const compare = await bcrypt.compare(password, userInfo[0].password);
  if (!userInfo.length || compare === false) {
    const error = Error("Not authorized");
    error.status = 401;
    throw error;
  }
  const token = jwt.sign({ id: response.rows[0].id }, JWT);
  return { token };
};

const findUserWithToken = async (token) => {
  try {
    const payload = await jwt.verify(token, JWT);
    const id = payload.id;
    const SQL = `
        SELECT id, firstName, lastName, email, phoneNumber, is_admin FROM users WHERE id = $1;
        `;
    const response = await client.query(SQL, [id]);
    if (!response.rows.length) {
      const error = Error("Not authorized");
      error.status = 401;
      throw error;
    }
    return response.rows[0];
  } catch (error) {
    error = Error("Not authorized");
    error.status = 401;
    throw error;
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.user = await findUserWithToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  client,
  createTables,
  createUser,
  updateUser,
  createFoodItem,
  updateFoodItem,
  createUserFoodItems,
  updateUserFoodItem,
  fetchUserFoodItems,
  fetchFoodItems,
  fetchUsers,
  fetchSingleUser,
  fetchSingleFoodItem,
  fetchSingleUserFoodItem,
  deleteFoodItem,
  deleteUserFoodItem,
  authenticate,
  isLoggedIn,
  issueUserToken,
};
