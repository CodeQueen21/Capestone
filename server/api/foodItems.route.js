const { createFoodItem, fetchFoodItems } = require("../db");
const express = require("express");
const foodItemsRouter = express();

foodItemsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchFoodItems());
  } catch (error) {
    next(error);
  }
});

module.exports = foodItemsRouter;
