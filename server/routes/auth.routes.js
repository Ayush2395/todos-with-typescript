const User = require("../model/user.model");

const authRoutes = require("express").Router();
const jwt = require("jsonwebtoken");

const createToken = ({ _id }) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: 3 * 24 * 60 * 60 });
};

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ accessToken: token, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRoutes.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ accessToken: token, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = authRoutes;
