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


  /**
   * Sends a welcome email containing an account verification link.
   * @param {string} email - Recipient email address
   * @param {string} name - User's full name
   * @param {string} verificationToken - Secure token generated for account verification
   */
  static async sendVerificationEmail(email, name, verificationToken) {
    const verificationUrl = `${process.env.CLIENT_URL || 'https://gamautos.com'}/verify-email?token=${verificationToken}`;

    // Development / Fallback Mode check
    if (!process.env.RESEND_API_KEY || process.env.NODE_ENV === 'development') {
      console.log(`[DEV MODE] Verification Link for ${email}: ${verificationUrl}`);
      if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not defined in environment variables.");
      }
      return;
    }

    try {
      const response = await resendClient.emails.send({
        from: process.env.EMAIL_FROM || 'Gamautos Support <noreply@gamautos.com>',
        to: [email],
        subject: 'Welcome to Gamautos! Please verify your email',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #0f172a; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">Welcome to Gamautos, ${name}!</h2>
            <p>Thank you for registering. Please confirm your email address by clicking the button below:</p>
            <div style="margin: 25px 0;">
              <a href="${verificationUrl}"
                 style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p style="font-size: 12px; color: #64748b;">
              If the button above does not work, copy and paste this link into your browser:<br>
              <a href="${verificationUrl}" style="color: #2563eb;">${verificationUrl}</a>
            </p>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">
              If you did not create an account with Gamautos, please ignore this email.
            </p>
          </div>
        `
      });

      return response;
    } catch (error) {
      console.error('Failed to send verification email via Resend:', error);
      throw error;
    }
  }
}

module.exports = EmailHelper;
