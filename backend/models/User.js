const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  clerkId: String,
  name: String,
  skills: [String],
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("User", UserSchema);