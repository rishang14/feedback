import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import { NextRequest, NextResponse } from "next/server";
import { DeleteSpace } from "@/lib/helper";

const { auth } = NextAuth(authConfig);

export async function DELETE(request:NextRequest,context: any) {
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
    console.log(id, "got the id"); 
     
    await DeleteSpace(id as string)
    return NextResponse.json({ message: "Space is deleted",id }, { status: 200 });
  } catch (error) { 
    console.log(error)
    return NextResponse.json({error:"internal server error"},{status:500})
  }
}
