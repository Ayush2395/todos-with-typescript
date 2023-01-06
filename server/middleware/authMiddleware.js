const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const authProtection = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw Error("Access token required");
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({_id}).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "unauthorized token" });
  }
};

module.exports = authProtection;
