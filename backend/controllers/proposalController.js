const Proposal = require("../models/Proposal");
const Doubt = require("../models/Doubt");
const sendEmail = require("../services/emailService");

exports.createProposal = async (req, res) => {
  try {

    const { doubtId, requesterEmail, mentorEmail } = req.body;

    const doubt = await Doubt.findById(doubtId);

    if (!doubt) {
      return res.status(404).json({
        message: "Doubt not found"
      });
    }

    const description = doubt.description;

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const proposal = new Proposal({
      doubtId,
      requesterEmail,
      mentorEmail,
      masterSentence: description,
      status: "pending",
      expiresAt
    });

    await proposal.save();

    const message = `
A student needs help.

Problem:
Description: ${description}

Please go to the GyaanSetu website and check your mentor requests to accept or reject this request.

(This request is valid for 1 hour)
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

    res.status(500).json({
      message: "Server error"
    });

  }
};

exports.acceptProposal = async (req, res) => {
  try {

    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found"
      });
    }

    proposal.status = "accepted";

    await proposal.save();

    res.json({
      message: "Proposal accepted",
      proposal
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

exports.rejectProposal = async (req, res) => {
  try {

    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found"
      });
    }

    proposal.status = "rejected";

    await proposal.save();

    res.json({
      message: "Proposal rejected",
      proposal
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};