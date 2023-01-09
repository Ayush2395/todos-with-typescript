const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authRoutes = require("express").Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: 4 * 24 * 60 * 60 });
};

authRoutes.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ token, email });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ token, email });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = authRoutes;
