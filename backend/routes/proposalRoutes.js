const express = require("express");
const router = express.Router();

const Proposal = require("../models/Proposal");

const {
  createProposal,
  acceptProposal,
  rejectProposal
} = require("../controllers/proposalController");

// Student sends proposal
router.post("/proposal", createProposal);

// Mentor accepts proposal
router.get("/proposal/accept/:id", acceptProposal);

// Mentor rejects proposal
router.get("/proposal/reject/:id", rejectProposal);

// Get proposal by ID (used in AcceptProposal page)
router.get("/proposal/:id", async (req, res) => {
  try {

    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found"
      });
    }

    res.json(proposal);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching proposal"
    });

  }
});

// Get all proposals for a mentor
router.get("/mentor-proposals/:email", async (req, res) => {
  try {

    const { email } = req.params;

    const proposals = await Proposal.find({
      mentorEmail: email
    });

    res.json(proposals);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching proposals"
    });

  }
});

module.exports = router;