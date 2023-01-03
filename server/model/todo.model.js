const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todosModel = new schema(
  {
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const todos = mongoose.model("todos", todosModel);
module.exports = todos;
