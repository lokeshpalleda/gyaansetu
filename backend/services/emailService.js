const nodemailer = require("nodemailer");

// create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
// console.log("EMAIL:", process.env.EMAIL_USER);
// console.log("PASS:", process.env.EMAIL_PASS);
// send email function
const sendEmail = async (to, subject, text) => {
  try {

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");

  } catch (error) {
    console.error("❌ Email error:", error);
  }
};

module.exports = sendEmail;