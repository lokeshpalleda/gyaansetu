const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const Proposal = require("../models/Proposal");
const nodemailer = require("nodemailer");

/* ===============================
   EMAIL TRANSPORTER
================================ */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ==================================
   CREATE SESSION + SEND MEETING LINK
================================== */

router.post("/sessions", async (req, res) => {

  try {

    const { proposalId, requesterEmail, mentorEmail, time } = req.body;

    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found"
      });
    }

    const meetingLink = "https://meet.jit.si/gyaansetu-" + proposalId;

    const session = new Session({
      proposalId,
      doubtId: proposal.doubtId,
      studentEmail: requesterEmail,
      mentorEmail,
      time,
      meetingLink,
      status: "active"
    });

    await session.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${requesterEmail}, ${mentorEmail}`,
      subject: "GyaanSetu Session Scheduled",
      html: `
        <h2>Your mentoring session is scheduled</h2>
        <p><b>Time:</b> ${time}</p>
        <p>Click below to join the meeting:</p>
        <a href="${meetingLink}">${meetingLink}</a>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      message: "Session scheduled successfully",
      session
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error scheduling session"
    });

  }

});


/* ==================================
   MARK SESSION COMPLETED
================================== */

router.patch("/sessions/complete/:id", async (req, res) => {

  try {

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found"
      });
    }

    session.status = "completed";

    await session.save();

    res.json({
      message: "Session completed",
      session
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error completing session"
    });

  }

});


/* ==================================
   STUDENT SESSIONS
================================== */

router.get("/sessions/student/:email", async (req, res) => {

  try {

    const sessions = await Session.find({
      studentEmail: req.params.email
    });

    res.json(sessions);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching sessions"
    });

  }

});


/* ==================================
   MENTOR SESSIONS
================================== */

router.get("/sessions/mentor/:email", async (req, res) => {

  try {

    const sessions = await Session.find({
      mentorEmail: req.params.email
    });

    res.json(sessions);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching sessions"
    });

  }

});

module.exports = router;