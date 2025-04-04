import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import { ObjectId } from "mongodb";
import connectDB from "@/lib/db.connect";
import Space from "@/mongoose/space.schema";
import User from "@/mongoose/user.schema";

const { auth } = NextAuth(authConfig);

export async function GET(req: NextRequest) {
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
    const user = await User.findOne({ email });

    const spaces = await Space.find({ userId: user._id });

    if (spaces) {
      return NextResponse.json(
        { messge: "got ur id ", spaces },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "currently there is no spaces" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}
