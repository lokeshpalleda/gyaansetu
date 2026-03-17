const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({

  proposalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal"
  },

  requesterEmail: String,

  mentorEmail: String,

  scheduledTime: Date,

  meetingLink: String,

  status: {
    type: String,
    default: "scheduled"
  }

}, { timestamps: true });

module.exports = mongoose.model("Session", SessionSchema);