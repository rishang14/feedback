import fs from "fs";
import nodemailer from "nodemailer"; 
import { getVerificationTokenByEmail } from "../emailhelper";
import { ConnectionStates } from "mongoose";

const verificationMailHTML = fs.readFileSync("public/template/email-verification.html", "utf-8");
const resetPassMailHTML = fs.readFileSync("public/template/password-forgot.html", "utf-8"); 

export const  SendverificationEmail =async (email:string,name:string)=>{
try { 
  console.log(email,"email"); 
  console.log(name,"name")
    const transporter = nodemailer.createTransport({
        service: process.env.EMAILSERVICE,
        host:process.env.EMAILHOST,
        port: Number(process.env.EMAILPORT),
        secure: true,
        auth: {
          user: process.env.EMAILUSER,
          pass: process.env.EMAILPASS,
        },
      }); 
     
      const verificationToken = await getVerificationTokenByEmail(email); 
      const verificationLink = `${process.env.NEXTAUTH_URL}/auth/verify?token=${verificationToken}`; 
      const  info = await transporter.sendMail({
        from: process.env.EMAILUSER,
        to: email,
        subject: "Verify your email address",
        html: verificationMailHTML.replace("{{ user_name }}", name).replace("{{verification_link}}", verificationLink),
      });
      return info;

    
} catch (error :any) {
    return error.message
}
}