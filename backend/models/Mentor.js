const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  skills: {
    type: [String],
    required: true
  }

},
{
  timestamps: true
});

/* ===============================
   Convert skills to lowercase
================================ */

mentorSchema.pre("save", function () {

  if (this.skills && this.skills.length > 0) {
    this.skills = this.skills.map(skill =>
      skill.toLowerCase().trim()
    );
  }

});

module.exports = mongoose.model("Mentor", mentorSchema);
