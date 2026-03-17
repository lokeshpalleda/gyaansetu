const mongoose = require("mongoose");

const DoubtSchema = new mongoose.Schema({

  userId: String,

  title: String,

  description: String,

  answers: [String],

  keywords: [String],

  masterSentence: String

}, { timestamps: true });

module.exports = mongoose.model("Doubt", DoubtSchema);