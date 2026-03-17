const Session = require("../models/Session");
const sendEmail = require("../services/emailService");

exports.createSession = async (req, res) => {

  try {

    console.log("API HIT");
    console.log(req.body);

    const { proposalId, requesterEmail, mentorEmail, scheduledTime } = req.body;

    // 🔗 generate meeting link
    const meetingLink = `https://meet.jit.si/gyaansetu-${proposalId}-${Date.now()}`;

    const session = new Session({
      proposalId,
      requesterEmail,
      mentorEmail,
      scheduledTime,
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
    res.status(500).json(error);

  }

};