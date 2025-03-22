import connectDB from "@/lib/db.connect";   
import * as z from "zod"; 
import { NextRequest,NextResponse } from "next/server";  
import { signupFormSchema } from "@/app/zod/schema";



connectDB(); //db connect is done   


export async function POST(request: NextRequest){
  try {
    const body= await request.json(); 

    const validatedData=  signupFormSchema.safeParse(body);  
    if (!validatedData.success) {
        return NextResponse.json({ error: validatedData.error.errors }, { status: 400 });
      }

    const {username,email,password}=validatedData.data; 

    return NextResponse.json({message: "Success", email, password, username},{ status: 200 }); 

  } catch (error) {

     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


