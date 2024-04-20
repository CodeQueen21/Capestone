const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users.route");
const foodItemsRouter = require("./foodItems.route");
const userFoodItemsRouter = require("./userFoodItems.route");
const cors = require("cors");
apiRouter.use(cors());
apiRouter.use("/users", usersRouter);
apiRouter.use("/foodItems", foodItemsRouter);
apiRouter.use("/userFoodItems", userFoodItemsRouter);

module.exports = apiRouter;
