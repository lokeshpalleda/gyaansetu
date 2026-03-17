const express = require("express");
const router = express.Router();

const { matchMentors } = require("../controllers/matchController");

router.post("/match-mentors", matchMentors);

module.exports = router;