const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({

  doubtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doubt"
  },

  requesterEmail: String,

  mentorEmail: String,

  masterSentence: String,

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "expired"],
    default: "pending"
  },

  expiresAt: Date

}, { timestamps: true });

module.exports = mongoose.model("Proposal", ProposalSchema);