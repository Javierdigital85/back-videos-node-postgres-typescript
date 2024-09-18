import nodemailer from "nodemailer"
import globalConstants from "../conts/globalContants"

const transporter = nodemailer.createTransport({
  host: globalConstants.NODEMAILER_HOST,
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: globalConstants.NODEMAILER_EMAIL,
    pass: globalConstants.NODEMAILER_PASS,
  },
});

async function verifyTransporter() {
  try {
    await transporter.verify();
    console.log("Ready for send emails");
  } catch (error) {
    console.log("Error verifyng transporter:", error);
  }
}

verifyTransporter();

export default transporter