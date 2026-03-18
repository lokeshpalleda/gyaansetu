const express = require("express");
const router = express.Router();

const {
  createProposal,
  acceptProposal
} = require("../controllers/proposalController");

router.post("/proposal", createProposal);
router.get("/proposal/accept/:id", acceptProposal);

module.exports = router;