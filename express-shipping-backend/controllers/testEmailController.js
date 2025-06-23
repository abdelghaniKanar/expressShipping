const transporter = require("../config/mailer");

const testEmail = async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: "abdelghani.kanar002@gmail.com", // change to your test email (will show in Mailtrap)
      subject: "Test Email from Express Shipping",
      text: "This is a test email sent via Mailtrap using Nodemailer.",
    });

    res.json({ message: "Test email sent successfully!" });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ message: "Failed to send email" });
  }
};

module.exports = testEmail;
