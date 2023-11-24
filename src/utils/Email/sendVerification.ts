import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import { sendCredentials } from "./sendMailGen.js";

dotenv.config();
export const VerifyEmail = async (email:string,name:string, code:number) => {
  console.log(name, email, code);
  const msg = {
    to: email,
    from: "ayiendaglen@gmail.com",
    subject: "Welcome to carhub",
    html: sendCredentials(name, email, code),
  };

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    const result = await sgMail.send(msg);
    if (result) {
      console.log(result);
    }
  } catch (error) {
    console.error(error);
  }
};