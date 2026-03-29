const express = require("express");
const router = express.Router();

const Mentor = require("../models/Mentor");

/* ================================
   GET ALL MENTORS
================================ */
router.get("/mentors", async (req, res) => {
  try {

    const mentors = await Mentor.find();

    res.json(mentors);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error fetching mentors" });

  }
});

/* ================================
   FILTER MENTORS BY SKILL
================================ */
router.get("/mentors/filter/:skill", async (req, res) => {

  try {

    const skill = req.params.skill.toLowerCase();

    const mentors = await Mentor.find({
      skills: { $in: [skill] }
    });

    res.json(mentors);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error filtering mentors" });

  }

});

/* ================================
   ADD NEW MENTOR
================================ */
router.post("/mentors", async (req, res) => {

  try {

    let { name, email, skills } = req.body;

    skills = skills.map(skill => skill.toLowerCase());

    const mentor = new Mentor({
      name,
      email,
      skills
    });

    await mentor.save();

    res.json({
      message: "Mentor added successfully",
      mentor
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error adding mentor" });

  }

});

/* ================================
   GET MENTOR BY EMAIL
================================ */
router.get("/mentor/:email", async (req, res) => {

  try {

    const mentor = await Mentor.findOne({
      email: req.params.email
    });

    res.json(mentor);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error fetching mentor" });

  }

});

/* ================================
   UPDATE MENTOR PROFILE (NEW)
================================ */
router.put("/mentor/update", async (req, res) => {

  try {

    let { name, email, skills } = req.body;

    skills = skills.map(skill => skill.toLowerCase());

    const mentor = await Mentor.findOneAndUpdate(
      { email },
      { name, skills },
      { new: true }
    );

    if (!mentor) {
      return res.status(404).json({
        message: "Mentor not found"
      });
    }

    res.json({
      message: "Profile updated successfully",
      mentor
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error updating profile" });

  }

});

module.exports = router;
