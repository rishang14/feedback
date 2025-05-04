import connectDB from "@/lib/db.connect";
import { NextRequest, NextResponse } from "next/server";
import { signupFormSchema } from "@/app/types/schema";
import User from "@/mongoose/user.schema";
import { generateVerificationToken } from "@/lib/emailhelper";
import { SendverificationEmail } from "@/lib/mailer/nodemailer";

 //db connect is done


const bcrypt = require("bcrypt");

export async function POST(request: NextRequest) {
  await connectDB()
  try {
    const body = await request.json();

    const validatedData = signupFormSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.errors },
        { status: 400 }
      );
    }

    const { username, email, password } = validatedData.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
  
    if (existingUser){
      return NextResponse.json(
        {
          message: "user already exists with this email or username",
        },
        { status: 409 }
      );
    }

    const createuser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    if(createuser){  
      // Generate token and send email
       await generateVerificationToken(createuser.email,"verifyemail");     
       await SendverificationEmail(createuser.email,createuser.username,"verifyemail"); 
    } 
    return NextResponse.json(
      { message: `Success new user is created with  ${email} and this ${username}` },
      { status: 200 }
    );
  } catch (error) { 
    console.log(error)
    return NextResponse.json(
      { error: error},
      { status: 500 }
    );
  }
}