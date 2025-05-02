import connectDB from "@/lib/db.connect";
import User from "@/mongoose/user.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const currentDate = new Date().toISOString();
    const body = await request.json();
    const { token } = body;
    console.log(token);

    const user = await User.findOne({
      emailToken: token,
      verifyTokenExpiry: { $gte: currentDate },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Token or User not found" },
        { status: 400 }
      );
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Congratulation You are verified " },
      { status: 200 }
    );
  } catch (error:any) {
    console.log(error); 
    return NextResponse.json({error:error.message},{status:500});
  }
}
