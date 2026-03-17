const User = require("../models/User");

exports.matchMentors = async (req, res) => {

  try {

    console.log("BODY:", req.body);   // add this

    const { keywords, userId } = req.body;

    const helpers = await User.find({
      skills: { $in: keywords }
    });

    console.log("MENTORS:", helpers);  // add this

    res.json(helpers);

  } catch (error) {

    console.log(error);
    res.status(500).json(error);

  }

};