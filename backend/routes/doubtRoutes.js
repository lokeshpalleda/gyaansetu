const express = require("express");
const router = express.Router();

const { createDoubt, submitAnswers } = require("../controllers/doubtController");

// create doubt
router.post("/doubt", createDoubt);

// submit answers
router.post("/doubt/answers", submitAnswers);

module.exports = router;