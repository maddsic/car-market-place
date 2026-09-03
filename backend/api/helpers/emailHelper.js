const { Resend } = require('resend');

// Prevent crashing at initialization if key is missing
const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

class EmailHelper {
  /**
   * Sends a 6-digit password reset code to a user
   * @param {string} email - Recipient email address
   * @param {string} code - The generated 6-digit code
   */
  static async sendResetCode(email, code) {
    // 1. Fallback if key is missing or in dev mode
    if (!process.env.RESEND_API_KEY || process.env.NODE_ENV === 'development') {
      console.log(`[DEV/FALLBACK MODE] Reset Code for ${email}: ${code}`);
      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not defined in environment variables.");
      }
      return;
    }

    try {
      const response = await resendClient.emails.send({
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

      return response;
    } catch (error) {
      console.error('Failed to send email via Resend:', error);
      throw error; // Let the calling controller catch this error gracefully
    }
  }
}

module.exports = EmailHelper;
