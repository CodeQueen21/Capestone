const {
  createUserFoodItems,
  fetchUserFoodItems,
  fetchSingleUserFoodItem,
} = require("../db");
const express = require("express");
const userFoodItemsRouter = express.Router();

userFoodItemsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUserFoodItems());
  } catch (error) {
    next(error);
  }
});

userFoodItemsRouter.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchSingleUserFoodItem({ id: req.params.id }));
  } catch (error) {
    next(error);
  }
});

module.exports = userFoodItemsRouter;
