require("dotenv").config();
const sendEmail = require("./services/emailService");

sendEmail(
  "yourgmail@gmail.com", // your email
  "Test Email 🚀",
  "Email working successfully!"
);