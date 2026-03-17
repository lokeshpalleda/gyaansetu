const Proposal = require("../models/Proposal");
const sendEmail = require("../services/emailService");

exports.createProposal = async (req, res) => {

  try {

    const { doubtId, requesterEmail, mentorEmail, masterSentence } = req.body;

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    const proposal = new Proposal({
      doubtId,
      requesterEmail,
      mentorEmail,
      masterSentence,
      status: "pending",
      expiresAt
    });

    await proposal.save();

    // 📧 SEND EMAIL TO MENTOR
    await sendEmail(
      mentorEmail,
      "New Mentorship Request",
      `A student needs help.\n\nProblem Summary:\n${masterSentence}\n\nPlease accept within 1 hour.`
    );

    res.json(proposal);

  } catch (error) {

    console.error(error);
    res.status(500).json(error);

  }

};


exports.acceptProposal = async (req, res) => {
  try {

    const { proposalId } = req.body;

    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // ⏰ Check if proposal expired
    if (new Date() > proposal.expiresAt) {

      proposal.status = "expired";
      await proposal.save();

      return res.status(400).json({
        message: "Proposal expired. Cannot accept after 1 hour."
      });

    }

    // ✅ Accept proposal
    proposal.status = "accepted";
    await proposal.save();

    res.json({
      message: "Proposal accepted",
      proposal
    });

  } catch (error) {

    console.error(error);
    res.status(500).json(error);

  }
};