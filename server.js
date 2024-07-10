const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const userRouters = require("./routes/userRoutes");
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://dishantshinde13:r0mJJJNhfJ9z9mOF@cluster0.imh2xjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("db connected"));
app.use("/api/user", userRouters);
app.listen(PORT, console.log("server listening to port 5000"));
