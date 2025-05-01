import mongoose from "mongoose";
import Testimnoails from "@/mongoose/testimonial.schema";
import SpaceQuestion from "@/mongoose/spaceQuestion.schema";
import Space from "@/mongoose/space.schema";
import User from "@/mongoose/user.schema";

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
    await session.endSession();
  }
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  return user;
};

export const getspacesWthUserId = async (uid: string) => {
  const spaceIds = await Space.find({ userId: uid }).select("_id");
  return spaceIds;
};

export const spaceidsContainsTestimonials = async (spaceids: Array<string>) => {
  const spcContainReview = await Testimnoails.distinct("spaceId", {
    spaceId: { $in: spaceids },
  });
  return spcContainReview;
};

export const DeleteProfile = async (
  userid: string,
  spaceIds: Array<string>,
  testimonialids: Array<string>
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (testimonialids.length > 0) {
      await Testimnoails.deleteMany({
        spaceId: { $in: testimonialids },
      }).session(session);
    }
    if (spaceIds.length > 0) {
      await SpaceQuestion.deleteMany({ spaceId: { $in: spaceIds } }).session(
        session
      );
      await Space.deleteMany({ _id: { $in: spaceIds } }).session(session);
    }
    await User.findByIdAndDelete(userid).session(session);
    await session.commitTransaction();
    console.log("✅ User and all associated data deleted successfully");
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
