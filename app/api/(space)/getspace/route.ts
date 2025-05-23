import {  NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import Space from "@/mongoose/space.schema";
import User from "@/mongoose/user.schema";

const { auth } = NextAuth(authConfig);

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  } 
  await connectDB();
  try {
    const email = session?.user?.email; 
    const userId = await User.findOne({ email }).select("_id");

    const spaces = await Space.find({ userId }).select("_id spacename");
    // console.log(spaces,"spaces")
    if(!spaces) return NextResponse.json({message:"No spaces founf "},{status:404}) 

      return NextResponse.json({message:"spaces",spaces},{status:200})
  } catch (error) {
    console.log(error);
  }
}
