import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";
import connectDB from "@/lib/db.connect";
import { NextRequest, NextResponse } from "next/server";
import { TagSchema } from "@/app/types/schema";
import Space from "@/mongoose/space.schema";
import Testimnoails from "@/mongoose/testimonial.schema";

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
    const body = await request.json();
    const validatedData = TagSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Tags format is incorrect" },
        { status: 401 }
      );
    }
    const { tag } = validatedData.data;
    console.log(tag, "tags");
    const space = await Space.findById(id);
    if (!space) {
      return NextResponse.json({ error: "Space Not Found" }, { status: 404 });
    }
    space.tags = space.tags.filter((t: string) => t !== tag);

    await space.save();

    const reviews = await Testimnoails.find({ spaceId: id });
    if (reviews.length === 0) {
      return NextResponse.json(
        { message: "No reviews Found" },
        { status: 200 }
      );
    }
    for (const review of reviews) {
      console.log("Original review tags:", review.tags);
      console.log("Tag to remove:", `"${tag}"`);
      const reviewWithUpdatedTags = review.tags.filter(
        (tags: string) => tags.trim().toLowerCase() !== tag.trim().toLowerCase()
      );
      if (reviewWithUpdatedTags.length !== review.tags.length) {
        review.tags = reviewWithUpdatedTags;
        await review.save();
      }
    }

    return NextResponse.json(
      { message: "Removed Tags successfully from Reviews and space" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Inetnal Server error " },
      { status: 500 }
    );
  }
}
