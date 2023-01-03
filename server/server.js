const express = require("express");
const app = express();
const port = 8000 || process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todos.routes");
const authRoutes = require("./routes/auth.routes");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mongoose.connection;
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`server running on port ${port}`))
  );

db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Database connected"));

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
