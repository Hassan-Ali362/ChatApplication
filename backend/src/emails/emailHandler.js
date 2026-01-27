// ----------------------------RESEND --------------------------------

// import { Resend } from "resend";
// import { WelcomeEmailTemplate } from "./WelcomeEmailTemplate.js";

// import { ENV } from '../lib/env.js';

// const resend = new Resend(ENV.RESEND_API_KEY);

// const sender = {
//   email: ENV.EMAIL_FROM,
//   name: ENV.EMAIL_FROM_NAME
// };

// // Function to send a welcome email to a new user
// export const sendWelcomeEmail = async (userEmail, username, clientUrl) => {

//     const {data, error} = await resend.emails.send({
//         from: `${sender.name} < ${sender.email}>`,
//         to: userEmail,
//         subject: "Welcome to ChatApp!",
//         html: WelcomeEmailTemplate(username, clientUrl)
//     }); 

//     if(error){
//         console.error("Error in sending welcome email:", error);
//         throw new Error("Failed to send welcome email");
//     }

//     console.log("Welcome email sent successfully:", data);
// };


// ----------------------------NODEMAILER --------------------------------
import nodemailer from "nodemailer";
import { WelcomeEmailTemplate } from "./WelcomeEmailTemplate.js";
import { ENV } from "../lib/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,   // Gmail App Password
  },
});

export const sendWelcomeEmail = async (userEmail, username, clientUrl) => {
  try {
    await transporter.sendMail({
      from: `"ChatApp" <${ENV.EMAIL_USER}>`,
      to: userEmail,
      subject: "Welcome to ChatApp 🎉",
      html: WelcomeEmailTemplate(username, clientUrl),
    });

    console.log("✅ Welcome email sent");
  } catch (error) {
    console.error("❌ Error sending welcome email:", error.message);
    throw new Error("Failed to send welcome email");
  }
};
