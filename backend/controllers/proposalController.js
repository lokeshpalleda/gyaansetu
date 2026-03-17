const Proposal = require("../models/Proposal");

exports.createProposal = async (req, res) => {

  try {

    const { doubtId, requesterId, helperId } = req.body;

    const proposal = new Proposal({
      doubtId,
      requesterId,
      helperId,
      status: "pending"
    });

    await proposal.save();

    res.json(proposal);

  } catch (error) {

    res.status(500).json(error);

  }

};



exports.acceptProposal = async (req, res) => {

  try {

    const { proposalId } = req.body;

    const proposal = await Proposal.findByIdAndUpdate(
      proposalId,
      { status: "accepted" },
      { new: true }
    );

    res.json(proposal);

  } catch (error) {

    res.status(500).json(error);

  }

};