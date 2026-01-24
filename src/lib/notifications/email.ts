import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface EmailResponse {
  success: boolean;
  message?: string;
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendEmail(options: EmailOptions): Promise<EmailResponse> {
  const { to, subject, html, text } = options;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn("SMTP not configured, skipping email");
    return { success: false, message: "Email not configured" };
  }

  try {
    const transport = getTransporter();

    await transport.sendMail({
      from: process.env.SMTP_FROM || "noreply@intactghana.com",
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""),
    });

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: "Failed to send email" };
  }
}
