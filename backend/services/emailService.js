const nodemailer = require("nodemailer");

// create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",     
  port: 587,
  secure: false,          
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendEmail = async (to, subject, text) => {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error);
  }

};

module.exports = sendEmail;
