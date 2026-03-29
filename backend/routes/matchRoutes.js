const express = require("express");
const router = express.Router();

const Mentor = require("../models/Mentor");

/* ==================================
   MATCH MENTORS BASED ON DOUBT TEXT
================================== */

router.post("/match-mentors", async (req, res) => {

  try {

    const { doubtText } = req.body;

    if (!doubtText) {
      return res.status(400).json({ message: "Doubt text required" });
    }

    const text = doubtText.toLowerCase();

    // find mentors whose skills appear in the doubt text
    const mentors = await Mentor.find({
      skills: {
        $elemMatch: {
          $regex: text,
          $options: "i"
        }
      }
    });

    res.json({
      mentors
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error matching mentors"
    });

  }

});

module.exports = router;
