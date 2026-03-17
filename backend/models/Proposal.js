const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  doubtId: String,
  requesterId: String,
  helperId: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Proposal", ProposalSchema);