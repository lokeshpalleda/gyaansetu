const express = require("express");
const router = express.Router();

const {
  createProposal,
  acceptProposal
} = require("../controllers/proposalController");
router.get("/proposal/accept/:id", acceptProposal);
router.post("/proposal", createProposal);

router.post("/proposal/accept", acceptProposal);

module.exports = router;