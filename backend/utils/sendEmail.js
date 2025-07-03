import axios from "axios";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post(
      "https://api.resend.com/email",
      {
        from: "Your Blog <no-reply@yourdomain.com>",
        to,
        subject,
        html,
      },
      {
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    const msg = err.response?.data || err.message;
    throw new Error(`Failed to send email: ${JSON.stringify(msg)}`);
  }
};
