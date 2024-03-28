import User from "@/models/user";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const token = generateToken(email);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    }
    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
    //mailOptions
    const mailOptions = {
      from: 'paras@paras.ai', // sender address
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : " Reset your password!",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${token}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${token}
            </p>`,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
//helper function
const generateToken = (payload: any) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};
