import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import SpaceQuestion from "@/mongoose/spaceQuestion.schema";
import Testimnoails from "@/mongoose/testimonial.schema";

// const { auth } = NextAuth(authConfig);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await auth();
  // if (!session?.user?.email) {
  //   return NextResponse.json(
  //     { error: "You are not allowed to access this api route" },
  //     { status: 400 }
  //   );
  // }

  await connectDB();
  try {
    const { id } = await params;
    const Questions = await SpaceQuestion.find({ spaceId: id }).select(
      "-spaceId"
    );

    const Testimonial = await Testimnoails.find({ spaceId: id }).select(
      " -spaceId "
    );
     
    console.log(Testimonial,"got it first")
    if (Questions) {
      return NextResponse.json({ Questions, Testimonial }, { status: 200 });
    }

    return NextResponse.json(
      { message: "space id is Invalid" },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
