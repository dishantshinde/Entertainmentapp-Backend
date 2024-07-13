const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const userRouters = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const mongouser = process.env.MONGO_USER;
const mongopw = process.env.MONGO_PW;
mongoose
  .connect(
    `mongodb+srv://${mongouser}:${mongopw}@cluster0.imh2xjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/user", userRouters);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
