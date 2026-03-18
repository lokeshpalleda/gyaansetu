const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  clerkId: String,
  name: String,
  email: {
    type: String,
    required: true
  },
  skills: [String]
});

module.exports = mongoose.model("User", UserSchema);