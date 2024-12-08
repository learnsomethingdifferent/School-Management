const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(to, subject, text) {
    const mailOptions = {
      from: "no-reply@bookstore.com",
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

module.exports = new EmailService();
