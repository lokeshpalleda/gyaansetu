const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({

  doubtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doubt",
    required: true
  },

  requesterEmail: {
    type: String,
    required: true
  },

  mentorEmail: {
    type: String,
    required: true
  },

  masterSentence: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "expired"],
    default: "pending"
  },

  expiresAt: {
    type: Date,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Proposal", ProposalSchema);