import { NextRequest, NextResponse } from "next/server";
import SpaceQuestion from "@/mongoose/spaceQuestion.schema";
import Space from "@/mongoose/space.schema";
import connectDB from "@/lib/db.connect";

export async function GET(
  request: NextRequest, 
  context: any
) { 
    await connectDB();
  try {
    const { spcname } = await context.params; 

    console.log(spcname, "i am getting space name")
    const spaceid = await Space.findOne({ spacename: spcname }).select("_id");
     console.log(spaceid,"got id")
    if (!spaceid) {
     return NextResponse.json(
        { error: "pls provide valid space name " },
        { status: 401 }
      );
    }
    const question = await SpaceQuestion.find({
      spaceId: spaceid ,
    }).select("-spaceId"); 

    // console.log(question,"got question")
    if (question) {
      return NextResponse.json({ question }, { status: 200 });
    }
    return NextResponse.json(
      { message: "No question available " },
      { status: 400 }
    );
  } catch (error) { 
    console.log(error)
    return NextResponse.json(
      { error: "Internal Server Error " },
      { status: 500 }
    );
  }
}
