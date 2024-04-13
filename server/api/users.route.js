const {
  createUser,
  fetchUsers,
  fetchSingleUser,
  updateUser,
  authenticate,
} = require("../db");
const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    res.send(await fetchSingleUser({ id: req.params.id }));
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    res.status(201).send(
      await createUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        is_admin: req.body.is_admin,
      })
    );
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  try {
    res.status(201).send(
      await updateUser({
        id: req.params.id,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      })
    );
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    res.send(await authenticate(req.body.email, req.body.password));
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
