import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import Testimnoails from "@/mongoose/testimonial.schema";

const { auth } = NextAuth(authConfig);

export async function DELETE(request: NextRequest, context: any) {
  const session = await auth();

  if (!session?.user?.email)
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  await connectDB();
  try {
    const { id } = await context.params;
    await Testimnoails.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
