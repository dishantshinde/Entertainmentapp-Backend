const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  bookmarkedContent: Array,
});

module.exports = mongoose.model("User", userShema);
