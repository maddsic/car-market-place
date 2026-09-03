const { Resend } = require('resend');

const resendClient = new Resend(process.env.RESEND_API_KEY);

class EmailHelper {
  /**
   * Sends a 6-digit password reset code to a user
   * @param {string} email - Recipient email address
   * @param {string} code - The generated 6-digit code
   */
  static async sendResetCode(email, code) {
    // Return early or fallback to Mailpit/Nodemailer if in local dev
    if (process.env.NODE_ENV === 'development' && !process.env.RESEND_API_KEY) {
      console.log(`[DEV MODE] Reset Code for ${email}: ${code}`);
      return;
    }

    return await resendClient.emails.send({
      from: process.env.EMAIL_FROM || 'Gamautos Support <noreply@gamautos.com>',
      to: [email],
      subject: 'Gamautos Account Recovery Code',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
          <h2 style="color: #1e3a8a;">Password Reset Request</h2>
          <p>We received a request to reset your Gamautos dealer account password.</p>
          <p>Use the following 6-digit verification code to complete your verification:</p>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p style="font-size: 12px; color: #64748b;">This code will expire in 15 minutes. If you did not make this request, please disregard this email safely.</p>
        </div>
      `
    });
  }
}
