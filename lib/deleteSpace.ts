import mongoose from "mongoose";
import Testimnoails from "@/mongoose/testimonial.schema";
import SpaceQuestion from "@/mongoose/spaceQuestion.schema";
import Space from "@/mongoose/space.schema";

export const DeleteSpace = async (spaceid: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Space.findByIdAndDelete(spaceid, { session });
    await SpaceQuestion.deleteOne({ spaceId: spaceid }, { session });
    await Testimnoails.deleteMany({ spaceId: spaceid }, { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
