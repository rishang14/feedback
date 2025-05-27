import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import Testimnoails from "@/mongoose/testimonial.schema";
import Space from "@/mongoose/space.schema";
import connectDB from "@/lib/db.connect";
import { error } from "console";

const { auth } = NextAuth(authConfig);
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  }
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const spaceId = searchParams.get("spaceid");
    const tab = searchParams.get("tab") ?? "review";

    if (!["review", "archeived", "walloflove"].includes(tab)) {
      return NextResponse.json(
        { message: "pls send vald data" },
        { status: 400 }
      );
    }

    const space = await Space.findById(spaceId);
    if (!space) {
      return NextResponse.json(
        { message: "Pls provide valid Id space Not Found" },
        { status: 404 }
      );
    }

    const query: any = { spaceId };

    if (tab === "review") {
      query.archeived = false;
    } else if (tab === "archeived") {
      query.archeived = true;
    } else if (tab === "walloflove") {
      query.walloflove = true;
    }

    const review = await Testimnoails.find(query).lean();

    if (!review) {
      return NextResponse.json(
        { message: "No review found pls provide valid data" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "successful", review },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Inernal server Error" },
      { status: 500 }
    );
  }
}
