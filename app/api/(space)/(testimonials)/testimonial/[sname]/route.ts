import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db.connect";
import { reviewForm } from "@/app/types/schema";
import Space from "@/mongoose/space.schema";
import Testimnoails from "@/mongoose/testimonial.schema";

export async function POST(
  req: NextRequest,
  { params }: { params: { sname: string } }
) {
  await connectDB();
  try {
    const { sname } = await params;
    console.log(sname);
    const body = await req.json();
    const validatedData = reviewForm.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Pls send valid data" },
        { status: 400 }
      );
    }
    const { name, email, text, consent, rating } = validatedData.data;
    const space = await Space.findOne({ spacename: sname }).select(" _id");
    console.log(space, "here is the id");
    if (!space) {
      return NextResponse.json(
        { message: "Pls provide valid Name" },
        { status: 404 }
      );
    }

    const testimonial = await Testimnoails.create({
      spaceId: space,
      name: name,
      email: email,
      text: text,
      consent: consent,
      rating: rating ?? undefined,
    });
    if (!testimonial)
      return NextResponse.json(
        { error: "error while submitting this form " },
        { status: 500 }
      );

    return NextResponse.json(
      { message: "Submitted successfully", testimonial ,space},
      { status: 200 }
    );
  } catch (error) { 
    console.log(error)
    return NextResponse.json(
      { error: "Something Went wrong " },
      { status: 500 }
    );
  }
}
