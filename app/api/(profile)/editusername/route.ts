import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import User from "@/mongoose/user.schema";
import { usernameSchema } from "@/app/types/schema";
const { auth } = NextAuth(authConfig);
export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email)
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  await connectDB();
  try {
    const body = await request.json();
    const { uid } = body;
    console.log(uid, "id"); 
    console.log(body,"body")
    const validatedData = usernameSchema.safeParse(body);
    // @ts-ignore
     const {username} = validatedData?.data
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "username is not valid" },
        { status: 400 }
      );
    } 
    const name=await User.findByIdAndUpdate(uid,{
      username :username
    })  
     
    if(!name){
      return NextResponse.json({error:'Something Went wrong while Updating'},{status:400});
    }
    
    return NextResponse.json({ message: "Username Changed" }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Iternal Server Error " },
      { status: 500 }
    );
  }
}
