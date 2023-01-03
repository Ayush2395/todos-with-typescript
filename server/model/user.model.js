const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.statics.signup = async function (email, password) {
  const isUser = await this.findOne({ email });
  if (isUser) {
    throw Error("User already exist");
  }

  if (!validator.default.isEmail(email)) {
    throw Error("Invalid email account");
  }

  if (!validator.default.isStrongPassword(password)) {
    throw Error("Your password is weak, try again");
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User not found");
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw Error("password is wrong");
  }

  return user;
};

const User = mongoose.model("users", UserSchema);

module.exports = User;
