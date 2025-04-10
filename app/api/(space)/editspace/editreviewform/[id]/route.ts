import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db.connect";
import SpaceQuestion from "@/mongoose/spaceQuestion.schema";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
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
    const {id} = params;  
    const data= await req.body ; 

    const questions= await SpaceQuestion.findById({_id:id}); 
    if(!questions) return NextResponse.json({message:"Pls provide valid id"},{status:400}); 
    
    return NextResponse.json({message:"Got the values" },{status:200})

  } catch (error) {}
}
