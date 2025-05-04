import connectDB from "@/lib/db.connect";
import {  NextResponse } from "next/server";
import User from "@/mongoose/user.schema";
import NextAuth from "next-auth";
import authConfig from "@/lib/auth.config";
import { error } from "console";

const { auth } = NextAuth(authConfig);

export async function GET() {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  await connectDB();
  try {
  
    const email=session?.user?.email  

    const user = await User.find({email}).select(
      " _id username isVerified email "
    );

    if (!user)
      return NextResponse.json({ error: "user not found" }, { status: 400 });

    console.log(user, "user");
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.log(error?.message);
    NextResponse.json({ error: "Something went wrong " }, { status: 500 });
  }
}
