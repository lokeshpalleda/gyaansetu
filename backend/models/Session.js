const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  proposalId: String,
  requesterId: String,
  helperId: String,
  chatRoomId: String,
  status: {
    type: String,
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Session", SessionSchema);