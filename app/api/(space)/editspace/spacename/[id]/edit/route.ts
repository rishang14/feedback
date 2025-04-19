import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import { NextRequest, NextResponse } from "next/server";
import { SpaceNameEditSchema } from "@/app/types/schema";
import Space from "@/mongoose/space.schema";

const { auth } = NextAuth(authConfig);

export async function PATCH(request: NextRequest, context: any) {
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
    const data = await request.json();
    const validatedData = SpaceNameEditSchema.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Pls send validate Data" },
        { status: 401 }
      );
    } 
    const {spacename}= validatedData.data
    console.log(validatedData.data, "data");
    const space = await Space.findOne({  spacename });
    if (space) {
      return NextResponse.json(
        { error: "Space with this name already exists choose different Name" },
        { status: 409 }
      );
    }

    const Editname = await Space.findByIdAndUpdate(
      id,
      {
        spacename
      },
      {
        new: true,
      }
    );
    if (!Editname) {
      return NextResponse.json(
        { error: "Spmething went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Space Name Updated" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
