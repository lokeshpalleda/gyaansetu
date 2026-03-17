const Session = require("../models/Session");

exports.createSession = async (req, res) => {

  try {

    const { proposalId, requesterId, helperId } = req.body;

    const session = new Session({
      proposalId,
      requesterId,
      helperId,
      chatRoomId: "session_" + Date.now(),
      status: "active"
    });

    await session.save();

    res.json(session);

  } catch (error) {

    res.status(500).json(error);

  }

};