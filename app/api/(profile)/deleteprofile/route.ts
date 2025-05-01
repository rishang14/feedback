import connectDB from "@/lib/db.connect";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import {
  getUserByEmail,
  spaceidsContainsTestimonials,
  getspacesWthUserId,
  DeleteProfile,
} from "@/lib/helper";
import { redirect } from "next/navigation";
import { url } from "inspector";

const { auth } = NextAuth(authConfig);

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  }
  await connectDB();
  try {
    const email = session?.user?.email;
    const user = await getUserByEmail(email as string);
    const sapceids = await getspacesWthUserId(user._id as string);
    const spccontainTestimonials = await spaceidsContainsTestimonials(sapceids);
    console.log(sapceids, "ids");
    console.log(spccontainTestimonials, "Testimonials");
    await DeleteProfile(user._id as string, sapceids, spccontainTestimonials);
    return NextResponse.redirect(new URL("/"));
    // return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
