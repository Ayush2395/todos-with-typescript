const mongoose = require("mongoose");

const schema = mongoose.Schema;

const todosSchema = new schema(
  {
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Todos = mongoose.model("todo", todosSchema);

module.exports = Todos;
