import connectDB from "@/lib/db.connect";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export async function DELETE() {
  const session = await auth();
  console.log(session, "session");
  if (session?.user?.email) {
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  }
  await connectDB();
  try {
    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error: any) {}
}
