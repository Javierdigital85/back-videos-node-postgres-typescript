import nodemailer from "nodemailer";
import { Resend } from "resend";
import globalConstants from "../conts/globalContants";

const isDevelopment = process.env.NODE_ENV === "development";

// Interfaz común para ambos transporters
interface Transporter {
  sendMail: (mailOptions: {
    from: string;
    to: string;
    subject: string;
    html: string;
  }) => Promise<any>;
}

let transporter: Transporter;

if (!isDevelopment && globalConstants.RESEND_API_KEY) {
  // PRODUCCIÓN: Usar Resend (API HTTP - no bloqueado por Render)
  const resend = new Resend(globalConstants.RESEND_API_KEY);

  // Adaptar Resend para que tenga la misma interfaz que Nodemailer
  transporter = {
    sendMail: async (mailOptions) => {
      // Resend requiere dominio verificado, usar email de prueba de Resend
      const fromEmail = "Videos App <onboarding@resend.dev>";

      const result = await resend.emails.send({
        from: fromEmail,
        to: mailOptions.to,
        subject: mailOptions.subject,
        html: mailOptions.html,
      });

      console.log("📧 Email sent via Resend:", result.data?.id || result);

      // Adaptar respuesta de Resend al formato de Nodemailer
      return {
        messageId: result.data?.id || "resend-email-sent",
        response: result,
      };
    },
  };

  console.log("📧 Using Resend for emails (Production)");
} else {
  // DESARROLLO: Usar Nodemailer (SMTP)
  transporter = nodemailer.createTransport({
    host: globalConstants.NODEMAILER_HOST,
    port: 587,
    secure: false, // false para puerto 587 (TLS)
    auth: {
      user: globalConstants.NODEMAILER_EMAIL,
      pass: globalConstants.NODEMAILER_PASS,
    },
  });

  // Verificar conexión solo en desarrollo
  async function verifyTransporter() {
    try {
      await (transporter as nodemailer.Transporter).verify();
      console.log("📧 Using Nodemailer (SMTP) for emails (Development)");
      console.log("✅ Ready to send emails");
    } catch (error) {
      console.log("⚠️ Error verifying transporter:", error);
      console.log(
        "⚠️ Emails will not work until SMTP credentials are configured"
      );
    }
  }

  verifyTransporter();
}

export default transporter;
