const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({

  proposalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
    required: true
  },

  doubtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doubt",
    required: true
  },

  studentEmail: {
    type: String,
    required: true
  },

  mentorEmail: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  meetingLink: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  }

}, { timestamps: true });

module.exports =
  mongoose.models.Session ||
  mongoose.model("Session", SessionSchema);