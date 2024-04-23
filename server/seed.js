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
      password: "shhhhhhh",
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
      name: "Pepperoni Pizza",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis ex et enim tempor commodo. Morbi dapibus mi turpis, nec interdum risus vehicula sed. Aenean molestie dolor in odio pulvinar commodo.",
      image: "http://localhost:3000/pepperoni.jpg",
      category: "pizza",
      price: 20,
      inventory: 3,
    }),
    createFoodItem({
      name: "Cheese Pizza",
      description:
        "Donec euismod lorem vitae ex eleifend, pellentesque rutrum mauris sagittis. Vivamus interdum nulla est, vel lobortis tortor consequat vel.",
      image: "http://localhost:3000/cheese.jpeg",
      category: "pizza",
      price: 18,
      inventory: 3,
    }),
    createFoodItem({
      name: "Hawaiian Pizza",
      description:
        "Pellentesque et rutrum lectus, in sodales turpis. Fusce ornare nisl eget elit fermentum, vel fringilla elit ornare.",
      image: "http://localhost:3000/hawaiian.jpeg",
      category: "pizza",
      price: 25,
      inventory: 3,
    }),
    createFoodItem({
      name: "Spaghetti",
      description:
        "Mauris eleifend sem nunc, ac convallis tellus convallis et. Cras eget eleifend lacus. Duis non volutpat augue",
      image: "http://localhost:3000/spaghetti.jpeg",
      category: "pasta",
      price: 15,
      inventory: 3,
    }),
    createFoodItem({
      name: "Chicken Alfredo",
      description:
        "Donec vitae risus id augue suscipit mattis nec accumsan lectus. Sed ornare arcu libero, a cursus arcu tincidunt in. ",
      image: "http://localhost:3000/alfredo.jpeg",
      category: "pasta",
      price: 25,
      inventory: 3,
    }),
    createFoodItem({
      name: "Lasagna",
      description:
        "Nullam congue mollis nibh et placerat. Fusce maximus tincidunt convallis.",
      image: "http://localhost:3000/lasagna.jpeg",
      category: "pasta",
      price: 25,
      inventory: 3,
    }),
    createFoodItem({
      name: "Greek Salad",
      description:
        "Etiam finibus libero est. Mauris facilisis rutrum nisl, sed dignissim lectus congue a.",
      image: "http://localhost:3000/greek.jpeg",
      category: "salad",
      price: 15,
      inventory: 3,
    }),
    createFoodItem({
      name: "Ceaser Salad",
      description:
        "Aliquam mollis velit neque, id mollis urna vestibulum id. Proin semper nulla quam, vel dapibus enim accumsan vitae.",
      image: "http://localhost:3000/ceaser.jpeg",
      category: "salad",
      price: 15,
      inventory: 3,
    }),
    createFoodItem({
      name: "House Salad",
      description:
        "Duis ut nisl ex. Nam metus tellus, finibus sit amet malesuada id, sollicitudin ac purus. Vivamus nisl ex, cursus at neque eget, dapibus imperdiet enim.",
      image: "http://localhost:3000/house.jpeg",
      category: "salad",
      price: 12,
      inventory: 3,
    }),
    createFoodItem({
      name: "Red Velvet Cake",
      description:
        "Vestibulum nulla magna, maximus at elit sit amet, molestie rhoncus sem.",
      image: "http://localhost:3000/redVelvet.jpeg",
      category: "dessert",
      price: 20,
      inventory: 3,
    }),
    createFoodItem({
      name: "Tiramisu",
      description:
        "Duis ut nisl ex. Nam metus tellus, finibus sit amet malesuada id, sollicitudin ac purus. Vivamus nisl ex, cursus at neque eget, dapibus imperdiet enim.",
      image: "http://localhost:3000/tiramisu.jpeg",
      category: "dessert",
      price: 20,
      inventory: 3,
    }),
  ]);
};

const seedUserFoodItems = async (users, foodItems) => {
  const [Kayla, Dave, Sarah] = users;
  const [
    pepperoni,
    cheese,
    hawaiian,
    spaghetti,
    alfredo,
    lasagna,
    greek,
    ceaser,
    house,
    cake,
    tiramisu,
  ] = foodItems;
  return await Promise.all([
    createUserFoodItems({
      user_id: Kayla.id,
      foodItem_id: cheese.id,
      quantity: 1,
      purchased: false,
    }),
    createUserFoodItems({
      user_id: Kayla.id,
      foodItem_id: pepperoni.id,
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
  console.log(users, foodItems);
};
