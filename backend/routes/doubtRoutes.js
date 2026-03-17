const express = require("express");
const router = express.Router();

const { createDoubt, submitAnswers } = require("../controllers/doubtController");

// Step 1: create doubt
router.post("/doubt", createDoubt);

// Step 2: submit answers
router.post("/submit-answers", submitAnswers);

module.exports = router;