const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  const isUser = await this.findOne({ email });

  if (isUser) {
    throw Error("User already registered");
  }

  if (!validator.default.isEmail(email)) {
    throw Error("Invalid email");
  }

  if (!validator.default.isStrongPassword(password)) {
    throw Error("Your password is weak, try another one");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User not found");
  }

  const matchPass = await bcrypt.compare(password, user.password);

  if (!matchPass) {
    throw Error("Password is wrong");
  }

  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
