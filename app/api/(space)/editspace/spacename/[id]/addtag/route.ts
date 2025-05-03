import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import { NextRequest, NextResponse } from "next/server";
import { TagSchema } from "@/app/types/schema";
import Space from "@/mongoose/space.schema";

const { auth } = NextAuth(authConfig);

export async function PATCH(request:NextRequest,context: any) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  }
  await connectDB(); 

  try {
    const {id}= await context.params; 
    const body= await request.json(); 
    const validatedData= TagSchema.safeParse(body.tags);  
  
    if(!validatedData.success){
        return NextResponse.json({error:"Tags format is incorrect"},{status:401})
    }   
    const {tags}=validatedData.data
    const space = await Space.findById(id);  
    if(!space){
     return NextResponse.json({error:"space not found"},{status:404})
    }
    const exists = space.tags.includes(tags);
    if(exists) return NextResponse.json({error:"Tag with this name already exists"},{status:401}); 
    space.tags.push(tags); 
    await space.save(); 
    return NextResponse.json({message:"Tag is created"},{status:200});
  } catch (error:any) {
    console.log(error.message) 
    return NextResponse.json({error:"Error while updating tags"},{status:500})
  }
} 

