const Mentor = require("../models/mentor");

exports.matchMentors = async (req, res) => {

  try {

    const { topic, answers } = req.body;

    if (!topic) {
      return res.status(400).json({
        message: "Topic is required"
      });
    }

    // Combine topic + answers
    const text = `${topic} ${(answers || []).join(" ")}`.toLowerCase();

    // Remove punctuation
    const cleanedText = text.replace(/[^\w\s]/g, "");

    // Split into keywords
    const keywords = cleanedText.split(/\s+/);

    console.log("KEYWORDS:", keywords);

    // Find mentors whose skills match keywords
    const mentors = await Mentor.find({
      skills: { $in: keywords }
    });

    console.log("MATCHED MENTORS:", mentors);

    res.json({
      mentors
    });

  } catch (error) {

    console.error("MATCH ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};