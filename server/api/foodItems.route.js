const {
  createFoodItem,
  fetchFoodItems,
  fetchSingleFoodItem,
  updateFoodItem,
  deleteFoodItem,
  isLoggedIn,
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
    console.log("reached :", req.params.id);
    const foodItem = await fetchSingleFoodItem({ id: req.params.id });
    console.log(foodItem);
    res.send(foodItem);
  } catch (error) {
    next(error);
  }
});

foodItemsRouter.post("/", isLoggedIn, async (req, res, next) => {
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

foodItemsRouter.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(
      await updateFoodItem({
        id: req.params.id,
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

foodItemsRouter.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await deleteFoodItem({ id: req.params.id }));
  } catch (error) {
    next(error);
  }
});

module.exports = foodItemsRouter;
