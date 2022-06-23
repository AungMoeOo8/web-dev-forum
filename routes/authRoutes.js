const express = require("express");

const authRouter = express.Router();

const User = require("../schema/userSchema");

//Get all users
authRouter.get("/users", async (req, res) => {
  const users = await User.find().all();
  const userArray = users.map((user) => {
    return {
      username: user.username,
      meta: {
        id: user.id,
        email: user.email,
        password: user.password,
      },
    };
  });

  res.json({ users: userArray });
});

//login

//register
authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });

  user.save((error) => {
    if (error) {
      res.json({ error: error });
      return;
    }

    res.status(201).json({ id: user.id });
  });
});

module.exports = authRouter;
