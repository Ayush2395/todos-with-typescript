const express = require("express");
const port = process.env.PORT || 8000;
const app = express();
const mongoose = require("mongoose");
const todosRoutes = require("./routes/todos.routes");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mongoose.connection;
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`server running on port ${port}`))
  );

db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Database connected"));

app.use("/api/todos", todosRoutes);
app.use("/api/auth", authRoutes);
