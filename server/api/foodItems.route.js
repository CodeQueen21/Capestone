const {
  createFoodItem,
  fetchFoodItems,
  fetchSingleFoodItem,
} = require("../db");
const express = require("express");
const foodItemsRouter = express();

foodItemsRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchFoodItems());
  } catch (error) {
    next(error);
  }
});

foodItemsRouter.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchSingleFoodItem({ id: req.params.id }));
  } catch (error) {
    next(error);
  }
});

foodItemsRouter.post("/", async (req, res, next) => {
  try {
    res.status(201).send(
      await createFoodItem({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        inventory: req.body.inventory,
      })
    );
  } catch (error) {
    next(error);
  }
});

module.exports = foodItemsRouter;
