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
      name: "Cheese Pizza",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "cheese.jpg",
      category: "pizza",
      price: 15,
      inventory: 10,
    }),
    createFoodItem({
      name: "Pepperoni Pizza",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "pepperoni.jpg",
      category: "pizza",
      price: 20,
      inventory: 10,
    }),
    createFoodItem({
      name: "Hawaiian Pizza",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "hawaiian.jpg",
      category: "pizza",
      price: 25,
      inventory: 10,
    }),
    createFoodItem({
      name: "MeatLover's Pizza",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "meat.jpg",
      category: "pizza",
      price: 25,
      inventory: 10,
    }),
    createFoodItem({
      name: "Spaghetti",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "hawaiian.jpg",
      category: "pasta",
      price: 20,
      inventory: 10,
    }),
    createFoodItem({
      name: "Shrimp Alfredo",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "alfredo.webp",
      category: "pasta",
      price: 25,
      inventory: 10,
    }),
    createFoodItem({
      name: "Lasagna",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "lasagna.jpeg",
      category: "pasta",
      price: 20,
      inventory: 10,
    }),
    createFoodItem({
      name: "Stuffed Shells",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "shells.jpeg",
      category: "pasta",
      price: 15,
      inventory: 10,
    }),
    createFoodItem({
      name: "Garden Salad",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "garden.jpeg",
      category: "salad",
      price: 20,
      inventory: 10,
    }),
    createFoodItem({
      name: "Greek Salad",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "greek.jpeg",
      category: "salad",
      price: 25,
      inventory: 10,
    }),
    createFoodItem({
      name: "Ceaser Salad",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "ceaser.jpeg",
      category: "salad",
      price: 20,
      inventory: 10,
    }),
    createFoodItem({
      name: "Tiramsu",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "tiramsu.jpeg",
      category: "dessert",
      price: 15,
      inventory: 10,
    }),
    createFoodItem({
      name: "Red Velvet Cake",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis enim non libero convallis, id ornare turpis venenatis. Ut fermentum quis nisi ut vestibulum. Sed vitae justo eros. Vestibulum mattis est eros.",
      image: "redVelvet.jpeg",
      category: "dessert",
      price: 15,
      inventory: 10,
    }),
  ]);
};

const seedUserFoodItems = async (users, foodItems) => {
  const [Kayla, Dave, Sarah] = users;
  const [
    Cheese,
    pepperoni,
    hawaiian,
    MeatLover,
    Spaghetti,
    alfredo,
    lasagna,
    shells,
    garden,
    greek,
    ceaser,
    Tiramsu,
    cake,
  ] = foodItems;
  return await Promise.all([
    createUserFoodItems({
      user_id: Kayla.id,
      foodItem_id: cake.id,
      quantity: 1,
      purchased: false,
    }),
    createUserFoodItems({
      user_id: Kayla.id,
      foodItem_id: alfredo.id,
      quantity: 1,
      purchased: false,
    }),
    createUserFoodItems({
      user_id: Sarah.id,
      foodItem_id: greek.id,
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
  console.log(users);
};
