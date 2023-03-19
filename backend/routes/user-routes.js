const express = require('express');
const { getAllUsers, signup, login } = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.get("/", getAllUsers );
userRouter.post("/signup", signup );
userRouter.post("/login", login);

module.exports = userRouter;