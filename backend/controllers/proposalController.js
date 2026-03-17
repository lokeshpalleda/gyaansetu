const Proposal = require("../models/Proposal");
const sendEmail = require("../services/emailService");

// ✅ CREATE PROPOSAL
exports.createProposal = async (req, res) => {

  try {

    const { doubtId, requesterEmail, mentorEmail, masterSentence } = req.body;

    // 🔥 1 hour expiry
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const proposal = new Proposal({
      doubtId,
      requesterEmail,
      mentorEmail,
      masterSentence,
      status: "pending",
      expiresAt
    });

    await proposal.save();

    // 🔗 Accept link (IMPORTANT)
    // const acceptLink = `http://localhost:5000/api/proposal/accept/${proposal._id}`;
    const acceptLink = `http://localhost:5173/accept/${proposal._id}`;
    // 📧 SEND EMAIL TO MENTOR
    const message = `
A student needs help.

Problem:
${masterSentence}

👉 Click below to accept:
${acceptLink}

(Valid for 1 hour)
`;

    await sendEmail(
      mentorEmail,
      "New Mentorship Request",
      message
    );

    res.json({
      message: "Proposal created successfully",
      proposal
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error", error });

  }

};


// ✅ ACCEPT PROPOSAL (via email link)
exports.acceptProposal = async (req, res) => {

  try {

    const proposalId = req.params.id;

    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.send("❌ Proposal not found");
    }

    // ⏰ expiry check
    if (new Date() > proposal.expiresAt) {
      proposal.status = "expired";
      await proposal.save();

      return res.send("❌ Proposal expired");
    }

    // prevent double accept
    if (proposal.status === "accepted") {
      return res.send("⚠️ Proposal already accepted");
    }

    proposal.status = "accepted";
    await proposal.save();

    return res.send("✅ Proposal accepted successfully");

  } catch (error) {
    console.error(error);
    res.send("❌ Server error");
  }

};