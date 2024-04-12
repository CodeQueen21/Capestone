const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users.route");
const foodItemsRouter = require("./foodItems.route");
const userFoodItemsRouter = require("./userFoodItems.route");

apiRouter.use("/users", usersRouter);
// apiRouter.use("/foodItems", foodItemsRouter);
// apiRouter.use("/userFoodItems", userFoodItemsRouter);

module.exports = apiRouter;
