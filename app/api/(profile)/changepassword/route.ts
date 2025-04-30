import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import User from "@/mongoose/user.schema";
import { PasswordSchema } from "@/app/types/schema";

const bcrypt = require("bcrypt");

const { auth } = NextAuth(authConfig);
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email)
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  await connectDB();
  try {
    const body = await request.json();
    const validatedData = PasswordSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Pls Send valid data" },
        { status: 400 }
      );
    }
    const { currentpass, newPass } = validatedData?.data;
    const email = session?.user?.email;
    const user = await User.findOne({ email }).select("password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    const valid = await bcrypt.compare(
      currentpass as string,
      user.password as string
    );

    if (!valid) {
      return NextResponse.json(
        { error: "Current password is wrong" },
        { status: 400 }
      );
    }

    const newhashpass = await bcrypt.hash(newPass, 10);

    user.password = newhashpass;
    await user.save();

    return NextResponse.json(
      { message: "Password is changed " },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
