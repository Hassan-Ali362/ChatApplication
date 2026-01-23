import { Resend } from "resend";
import dotenv from "dotenv";
import { WelcomeEmailTemplate } from "./WelcomeEmailTemplate.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME
};

// Function to send a welcome email to a new user
export const sendWelcomeEmail = async (userEmail, username, clientUrl) => {

    const {data, error} = await resend.emails.send({
        from: `${sender.name} < ${sender.email}>`,
        to: userEmail,
        subject: "Welcome to ChatApp!",
        html: WelcomeEmailTemplate(username, clientUrl)
    }); 

    if(error){
        console.error("Error in sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email sent successfully:", data);
};
