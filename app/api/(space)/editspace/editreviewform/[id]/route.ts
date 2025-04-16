import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db.connect";
import SpaceQuestion from "@/mongoose/spaceQuestion.schema";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function PATCH(
  req: NextRequest,
  context: any
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  }
  await connectDB();
  try {
    const { id } =  context.params;
    const data = await req.json();
    console.log(data);
    const questions = await SpaceQuestion.findById({ _id: id });
    if (!questions) {
      return NextResponse.json(
        { message: "Pls provide valid id" },
        { status: 400 }
      );
    }

    const updataData = await SpaceQuestion.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (!updataData) {
      return NextResponse.json(
        { error: "Review Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Review Form is updated" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json( 
      // @ts-ignore
      { error: "Internal server  Error ", },
      { status: 500 }
    );
  }
}
