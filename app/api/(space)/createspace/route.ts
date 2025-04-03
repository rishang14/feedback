import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import Space from "@/mongoose/space.schema";
import SpaceQuestion from "@/mongoose/spaceQuestion.schema";

import { spaceFormSchema } from "@/app/types/schema";

const { auth } = NextAuth(authConfig);

export async function POST(req: NextRequest) {
  const session = await auth(); 


  if (!session?.user?.email)
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 401 }
    );
 
  await connectDB();
  try {
    const body = await req.json();
    const validatedData = spaceFormSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: "Invalid Inputs",
          details: validatedData.error.format(),
        },
        { status: 401 }
      );
    }

    console.log(validatedData.data, "data received");

    return NextResponse.json(
      {
        message: "Received the data ",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Interval Server while creating space" },
      { status: 500 }
    );
  }
}
