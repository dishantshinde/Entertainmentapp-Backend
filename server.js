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
  .then(() => console.log("db connected"));

// Serve static files from the React app
app.use(express.static("../client/build"));
// API routes
app.use("/api/user", userRouters);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client/build/index.html"));
});
app.post("/api/user/signup", (req, res) => {
  // Handle signup logic here
  res.status(200).send("Signup route working!"); // Example response
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
