const { createUserFoodItems, fetchUserFoodItems } = require("../db");
const express = require("express");
const userFoodItemsRouter = express.Router();

userFoodItemsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUserFoodItems());
  } catch (error) {
    next(error);
  }
});

module.exports = userFoodItemsRouter;
