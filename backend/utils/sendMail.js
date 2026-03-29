const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendMeetingEmail = async (studentEmail, mentorEmail, meetingLink, time) => {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${studentEmail}, ${mentorEmail}`,
    subject: "Your GyaanSetu Session is Scheduled",
    html: `
      <h2>Session Confirmed</h2>
      <p><b>Time:</b> ${time}</p>
      <p>Join the meeting using this link:</p>
      <a href="${meetingLink}">${meetingLink}</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMeetingEmail;