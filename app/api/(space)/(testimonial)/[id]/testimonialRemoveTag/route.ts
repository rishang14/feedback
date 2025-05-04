import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import Testimnoails from "@/mongoose/testimonial.schema";
import { TagSchema } from "@/app/types/schema";

const { auth } = NextAuth(authConfig);

export async function PATCH(request: NextRequest, context: any) {
  const session = await auth();

  if (!session?.user?.email)
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );
  await connectDB();
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = TagSchema.safeParse(body.tag);

    if (!validatedData.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 401 });
    }
    const { tags } = validatedData.data;
    const Testimnoail = await Testimnoails.findById(id);
    if (!Testimnoail) {
      return NextResponse.json(
        { error: "No Tesimonial found with this id" },
        { status: 404 }
      );
    }

    Testimnoail.tags = Testimnoail.tags.filter((t: string) => t !== tags);
    await Testimnoail.save();
    return NextResponse.json(
      { message: "Tag removed successfully" },
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
