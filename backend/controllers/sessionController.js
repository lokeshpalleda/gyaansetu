const Session = require("../models/Session");
const sendEmail = require("../services/emailService");
const Proposal = require("../models/Proposal");

exports.createSession = async (req, res) => {

  try {

    const { proposalId, requesterEmail, mentorEmail, scheduledTime } = req.body;

    // ✅ Check proposal exists
    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found"
      });
    }

    // ✅ Allow session only if proposal accepted
    if (proposal.status !== "accepted") {
      return res.status(400).json({
        message: "Session can only be created after proposal is accepted"
      });
    }

    // ✅ Time restriction (next 4 hours)
    const selectedTime = new Date(scheduledTime);

    if (!scheduledTime || isNaN(selectedTime.getTime())) {
  return res.status(400).json({
    message: "Invalid scheduledTime format"
  });
}
    const now = new Date();
    const maxTime = new Date(now.getTime() + 4 * 60 * 60 * 1000);

    if (selectedTime < now || selectedTime > maxTime) {
      return res.status(400).json({
        message: "Mentor can only schedule within the next 4 hours"
      });
    }

    // ✅ Mentor conflict check
    const existingSession = await Session.findOne({
      mentorEmail,
      scheduledTime: selectedTime
    });

    if (existingSession) {
      return res.status(400).json({
        message: "Mentor already has a session at this time"
      });
    }

    // ✅ Generate meeting link
    const meetingLink = `https://meet.jit.si/gyaansetu-${proposalId}-${Date.now()}`;

    const session = new Session({
      proposalId,
      requesterEmail,
      mentorEmail,
      scheduledTime: selectedTime,
      meetingLink,
      status: "scheduled"
    });

    await session.save();

    console.log("SESSION SAVED");

    // 📧 email message
    const message = `
Your session is scheduled.

Time: ${scheduledTime}

Meeting Link:
${meetingLink}
`;

    // send emails
    await sendEmail(requesterEmail, "Session Scheduled", message);
    await sendEmail(mentorEmail, "Session Scheduled", message);

    res.json({
      message: "Session created successfully",
      session
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }

};