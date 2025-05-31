import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db.connect";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import Space from "@/mongoose/space.schema";
import Testimnoails from "@/mongoose/testimonial.schema";
import mongoose from "mongoose";
import { error } from "console";

const { auth } = NextAuth(authConfig);
export async function GET(req: NextRequest) {
//   const session = await auth();
//   if (!session?.user?.email) {
//     return NextResponse.json(
//       { error: "You are not allowed to access this api route" },
//       { status: 400 }
//     );
//   }
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const spacedId = searchParams.get("sId");

    if (!spacedId || !mongoose.Types.ObjectId.isValid(spacedId)) {
      return NextResponse.json({ error: "Invalid space id" }, { status: 400 });
    }

    const sid = await Space.findById(spacedId).select("_id");

    if (!sid) {
      return NextResponse.json(
        { error: "Space Not found With this id" },
        { status: 404 }
      );
    }

    const review = await Testimnoails.find(
      { spaceId: sid, walloflove: true },
      { spaceId: 0 }
    );

    console.log(review, "review");

    if (!review) {
      NextResponse.json({ error: "No review founds" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Successful", review },
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
