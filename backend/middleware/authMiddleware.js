const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw Error("token required");
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.find(_id).select("_id");
    next();
  } catch (error) {
    res.status(400).json({ error: "unauthorized token" });
  }
};

module.exports = authMiddleware;
