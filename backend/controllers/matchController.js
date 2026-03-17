const User = require("../models/User");

exports.matchMentors = async (req, res) => {

  try {

    // get user input
    const { title, description } = req.body;

    console.log("TITLE:", title);
    console.log("DESCRIPTION:", description);

    // combine text
    const text = `${title} ${description}`.toLowerCase();

    // simple keyword extraction
    const keywords = text.split(" ");

    console.log("EXTRACTED KEYWORDS:", keywords);

    // find mentors whose skills match any keyword
    const mentors = await User.find({
      skills: { $in: keywords }
    });

    console.log("MATCHED MENTORS:", mentors);

    res.json(mentors);

  } catch (error) {

    console.error("ERROR:", error);
    res.status(500).json({ message: "Server error" });

  }

};