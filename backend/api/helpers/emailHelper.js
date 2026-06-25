const nodemailer = require("nodemailer");

//  1. Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || '127.0.0.1',
  port: process.env.EMAIL_PORT || 1025,
  secure: false, // false for local development, true for production
  auth: process.env.EMAIL_USER ? {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  } : null,
})


class EmailHelper {
  /**
   * Sends a 6-digit password reset code to a user
   * @param {string} email - Recipient email address
   * @param {string} code - The generated 6-digit code
   */
  static async sendResetCode(email, code) {
    const mailOptions = {
      from: '"Gamautos Support" <noreply@gamautos.com>',
      to: email,
      subject: 'Gamautos Account Recovery Code',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
          <h2 style="color: #1e3a8a;">Password Reset Request</h2>
          <p>We received a request to reset your Gamautos dealer account password.</p>
          <p>Use the following 6-digit verification code to complete your verification:</p>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p style="font-size: 12px; color: #64748b;">This code will expire shortly. If you did not make this request, please disregard this email safely.</p>
        </div>
      `
    };

    return transporter.sendMail(mailOptions);
  }
}

module.exports = EmailHelper;
