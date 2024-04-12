const {
  createTables,
  createUser,
  createFoodItem,
  createUserFoodItems,
} = require("./db");

const seedUsers = async () => {
  return await Promise.all([
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
};

const seedFoodItems = async () => {
  return await Promise.all([
    createFoodItem({
      name: "pizza",
      description: "im a pizza",
      image: "pizza.jpg",
      category: "pizzas",
      price: 6,
      inventory: 10,
    }),
    createFoodItem({
      name: "spaghetti",
      description: "im spahgetti",
      image: "spaghetti.jpeg",
      category: "pastas",
      price: 10,
      inventory: 10,
    }),
    createFoodItem({
      name: "salad",
      description: "im a salad",
      image: "salad.jpg",
      category: "salads",
      price: 6,
      inventory: 10,
    }),
  ]);
};

const seedUserFoodItems = async (users, foodItems) => {
  const [Kayla, Dave, Sarah] = users;
  const [pizza, spaghetti, salad] = foodItems;
  return await Promise.all([
    createUserFoodItems({
      user_id: Kayla.id,
      foodItem_id: salad.id,
      quantity: 1,
      purchased: false,
    }),
    createUserFoodItems({
      user_id: Kayla.id,
      foodItem_id: pizza.id,
      quantity: 1,
      purchased: false,
    }),
    createUserFoodItems({
      user_id: Sarah.id,
      foodItem_id: salad.id,
      quantity: 1,
      purchased: false,
    }),
  ]);
};

module.exports = async () => {
  await createTables();
  console.log("tables created");
  const users = await seedUsers();
  const foodItems = await seedFoodItems();
  const userFoodItems = await seedUserFoodItems(users, foodItems);
  console.log(userFoodItems);
};
