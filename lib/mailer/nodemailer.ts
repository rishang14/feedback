import fs from "fs";
import nodemailer from "nodemailer"; 
import { getVerificationTokenByEmail } from "../emailhelper"; 
import path from "path",


type prop= "verifyemail" | "forgotpassword"
import path from "path";

const verificationMailHTML = fs.readFileSync(
  path.join(process.cwd(), "public", "template", "email-verification.html"),
  "utf-8"
);

const resetPassMailHTML = fs.readFileSync(
  path.join(process.cwd(), "public", "template", "password-forgot.html"),
  "utf-8"
);


export const  SendverificationEmail =async (email:string,name:string,emailtype:prop)=>{
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
     let info;
    if(emailtype==="verifyemail") {
      const verificationToken = await getVerificationTokenByEmail(email,"verifyemail"); 
      const verificationLink = `${process.env.NEXTAUTH_URL}/verifyemail?token=${verificationToken}`; 
      info = await transporter.sendMail({
        from: process.env.EMAILUSER,
        to: email,
        subject: "Verify your email address",
        html: verificationMailHTML.replace("{{ user_name }}", name).replace("{{verification_link}}", verificationLink),
      });
     }else if(emailtype==="forgotpassword"){
      const forgottoken = await getVerificationTokenByEmail(email,"forgotpassword"); 
      const resetlink = `${process.env.NEXTAUTH_URL}/forgotpassword?token=${forgottoken}`; 
      info = await transporter.sendMail({
        from: process.env.EMAILUSER,
        to: email,
        subject: "Forgot Your Password",
        html: resetPassMailHTML.replace("{{ user_name }}", name).replace("{{reset_link}}", resetlink),
      });
     }
      return info;

    
} catch (error :any) {
    return error.message
}
}
