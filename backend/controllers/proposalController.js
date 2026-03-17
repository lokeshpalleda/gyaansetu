const Proposal = require("../models/Proposal");
const sendEmail = require("../services/emailService");

// CREATE PROPOSAL
exports.createProposal = async (req, res) => {
  try {
    const { doubtId, requesterEmail, mentorEmail, masterSentence } = req.body;

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const proposal = new Proposal({
      doubtId,
      requesterEmail,
      mentorEmail,
      masterSentence,
      status: "pending",
      expiresAt
    });

    await proposal.save();

    const acceptLink = `http://localhost:5173/accept/${proposal._id}`;

    const message = `
A student needs help.

Problem:
${masterSentence}

Click below to accept:
${acceptLink}

(Valid for 1 hour)
`;

    await sendEmail(mentorEmail, "New Mentorship Request", message);

    res.json({
      message: "Proposal created successfully",
      proposal
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ACCEPT PROPOSAL
exports.acceptProposal = async (req, res) => {
  try {

    const proposalId = req.params.id;
    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    if (new Date() > proposal.expiresAt) {
      proposal.status = "expired";
      await proposal.save();
      return res.status(400).json({ message: "Proposal expired" });
    }

    proposal.status = "accepted";
    await proposal.save();

    res.json({
      message: "Proposal accepted",
      proposal
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};