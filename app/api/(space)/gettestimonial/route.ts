import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import Testimnoails from "@/mongoose/testimonial.schema";
import Space from "@/mongoose/space.schema";
import { connect } from "http2";
import connectDB from "@/lib/db.connect";

const { auth } = NextAuth(authConfig);
export async function GET(req: NextRequest){
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  } 
  await connectDB();
  try {
     const { searchParams } = new URL(req.url); 
     console.log(searchParams,"params")
    

  } catch (error) {
    
  }
}