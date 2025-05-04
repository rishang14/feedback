import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import Testimnoails from "@/mongoose/testimonial.schema";

const { auth } = NextAuth(authConfig);

export async function PATCH(request: NextRequest,context:any) {
  const session = await auth();

  if (!session?.user?.email)
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  await connectDB(); 
  try {
    const {id} = await context.params; 

    const Testimnoail= await Testimnoails.findById(id); 
    if(!Testimnoail){
        return NextResponse.json({error:"No Tesimonial found with this id"},{status:404}); 
    }  
  Testimnoail.walloflove = true ; 
  await Testimnoail.save(); 

  return NextResponse.json({message:"Liked successfully"},{status:200})
  } catch (error:any) {
     console.log(error.message); 
     return NextResponse.json({error:"Internal Server Error"},{status:500});
  }

}