import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import SpaceQuestion from "@/mongoose/spaceQuestion.schema";
import Testimnoails from "@/mongoose/testimonial.schema";
import Space from "@/mongoose/space.schema";

const { auth } = NextAuth(authConfig);

export async function GET(
  request: NextRequest,
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
    const { id } = await context.params; 
    const space = await Space.findById(id); 

    if(!space){
      return NextResponse.json(
        { message: "Not Found" },
        { status: 404 }
      );
    }; 

    const Tags =await space?.tags ;  
    const Questions = await SpaceQuestion.find({ spaceId: id }).select(
      "-spaceId"
    );
    const Testimonial = await Testimnoails.find({ spaceId: id }).select(
      " -spaceId "
    );
    return NextResponse.json({message:"success ",Tags, Questions,Testimonial},{status:200})
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
