import { NextRequest, NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import Space from "@/mongoose/space.schema";
import SpaceQuestion from "@/mongoose/spaceQuestion.schema";
import { spaceFormSchema } from "@/app/types/schema";
import User from "@/mongoose/user.schema";
import { error } from "console";

const { auth } = NextAuth(authConfig);

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email)
    return NextResponse.json(
      { error: "You are not allowed to access this api route" },
      { status: 400 }
    );

  await connectDB();
  try {
    const body = await req.json();
    const validatedData = spaceFormSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: "Invalid Inputs",
          details: validatedData.error.format(),
        },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: session?.user.email });
    // console.log(user, "user"); 

    const spaceExists= await Space.findOne({spacename:validatedData.data.spaceName}); 

    if(spaceExists) return NextResponse.json({error:"Space with this name already exists"},{status:400});

    const createSpace = await Space.create({
      userId: user._id,
      spacename: validatedData.data.spaceName,
      reviewFormLink: validatedData.data.spaceName,
    });

    // console.log(createSpace, "space created");

    if (!createSpace) {
      return NextResponse.json(
        { error: "Something went wrong with server" },
        { status: 500 }
      );
    }

    const spaceQuestion = await SpaceQuestion.create({
      spaceId: createSpace._id,
      header: validatedData.data.header,
      customDescription: validatedData.data.customDescription,
      textbuttonText: validatedData.data.textbuttonText,
      videoButtonText: validatedData.data.videoButtonText,
      questions: validatedData.data.questions,
      questionlabel: validatedData.data.questionlabel,
      thankYouTitle: validatedData.data.thankYouTitle,
      thankYouMessage: validatedData.data.thankYouMessage,
      theme: validatedData.data.theme,
      thankyouimg: validatedData.data.thankyouimg,
      videoreviewEnabled: validatedData.data.videoreviewEnabled,
      videotime: validatedData.data.videotime,
      ratingEnabled: validatedData.data.ratingEnabled,
      redirectUrl: validatedData.data.redirectUrl,
    });

    if (spaceQuestion) {
      return NextResponse.json(
        { message: "Your Space is created ",reviewFormlink:validatedData.data.spaceName },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Interval Server while creating space" },
      { status: 500 }
    );
  }
}
